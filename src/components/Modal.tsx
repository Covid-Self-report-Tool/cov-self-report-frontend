import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  Checkbox,
  FormControlLabel,
  DialogActions,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from '@material-ui/core';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import grey from '@material-ui/core/colors/grey';
import { FirebaseAuthConsumer, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { SymptomForm, Symptoms } from 'types';

type Location = [number, number];

const getSteps = () => {
  return ['Symptoms', 'Location', 'Submit'];
};

export const Modal = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [location, setLocation] = useState<Location | null>(null);
  const [symptoms, setSymptoms] = useState<SymptomForm>({
    symptoms: {
      fever: { isPresent: false },
      headache: { isPresent: false },
      shortnessOfBreath: { isPresent: false },
      lackOfSmell: { isPresent: false },
      lackOfTaste: { isPresent: false },
      soreThroat: { isPresent: false },
      nausea: { isPresent: false },
      cough: { isPresent: false },
    },
    location: null,
  });
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
  };

  const submitForm = () => {
    console.log('form submitted');
  };

  const toggleSymptom = (symptom: Symptoms) => {
    const newSymptoms = { ...symptoms };
    console.log('symptom', symptom);
    console.log('symptoms', symptoms);

    newSymptoms.symptoms[symptom].isPresent = !newSymptoms.symptoms[symptom]
      .isPresent;

    setSymptoms(newSymptoms);
  };

  const handleSelect = (newAddress: string) => {
    geocodeByAddress(newAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => {
        setLocation(latLng);
        setAddress(newAddress);
      })
      .catch(console.error);
  };

  const displayStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <DialogTitle id="form-dialog-title">
              What are your symptoms?
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={symptoms.symptoms.cough.isPresent}
                          onChange={() => toggleSymptom(Symptoms.cough)}
                          name="cough"
                          color="primary"
                        />
                      }
                      label="Cough"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={symptoms.symptoms.fever.isPresent}
                          onChange={() => toggleSymptom(Symptoms.fever)}
                          name="fever"
                          color="primary"
                        />
                      }
                      label="Fever"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={symptoms.symptoms.headache.isPresent}
                          onChange={() => toggleSymptom(Symptoms.headache)}
                          name="headache"
                          color="primary"
                        />
                      }
                      label="Headache"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            symptoms.symptoms.shortnessOfBreath.isPresent
                          }
                          onChange={() =>
                            toggleSymptom(Symptoms.shortnessOfBreath)
                          }
                          name="shortnessOfBreath"
                          color="primary"
                        />
                      }
                      label="Shortness of Breath"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        );
      case 1:
        return (
          <div>
            <DialogTitle>Where do you live?</DialogTitle>
            <DialogContent>
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <TextField
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: grey['600'], cursor: 'pointer' }
                          : { backgroundColor: '#424242', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </DialogContent>
          </div>
        );
      case 2:
        return (
          <IfFirebaseUnAuthed>
            {() => (
              <div>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                  <FirebaseAuthConsumer>
                    {({ user }) => user.email}
                  </FirebaseAuthConsumer>
                </DialogContent>
              </div>
            )}
          </IfFirebaseUnAuthed>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <FirebaseAuthConsumer>
      {() => (
        <Dialog
          open
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="xs"
        >
          <Stepper activeStep={activeStep}>
            {steps.map(label => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: { optional?: React.ReactNode } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {displayStep(activeStep)}
          <DialogActions>
            <Button to="/" component={RouteLink} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleBack}
              color="primary"
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep < 2 ? (
              <Button onClick={handleNext} color="primary">
                Next
              </Button>
            ) : (
              <Button onClick={submitForm} color="primary">
                Submit
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </FirebaseAuthConsumer>
  );
};
