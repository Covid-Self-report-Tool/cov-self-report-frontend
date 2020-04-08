import React, { useState } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
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
import {
  FirebaseAuthConsumer,
  IfFirebaseUnAuthed,
  IfFirebaseAuthed,
} from '@react-firebase/auth';
import { SymptomForm, Symptoms } from 'types';
import { postFormData } from 'utils/api';
import { camelCaseToLabel } from 'utils/strings';

type Location = [number, number];

const getSteps = () => {
  return ['Symptoms', 'Location', 'Submit'];
};

export const Modal = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
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
  const history = useHistory();

  const steps = getSteps();

  // This is to create a grid layout, split into two groups
  const allSymptoms = Object.keys(Symptoms) as Array<keyof typeof Symptoms>;
  const halfwayThrough = Math.floor(allSymptoms.length / 2);
  const firstHalfSymptoms: Array<keyof typeof Symptoms> = allSymptoms.splice(
    0,
    halfwayThrough
  );
  const lastHalfSymptoms: Array<keyof typeof Symptoms> = allSymptoms;

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
    postFormData(symptoms)
      .then((res: any) => {
        console.log(`got back ${res}`);
        history.push('/');
      })
      .catch((err: any) => {
        console.error(err);
        history.push('/');
      });
  };

  const toggleSymptom = (symptom: Symptoms) => {
    const newSymptoms = { ...symptoms };

    newSymptoms.symptoms[symptom].isPresent = !newSymptoms.symptoms[symptom]
      .isPresent;

    setSymptoms(newSymptoms);
  };

  const handleSelect = (newAddress: string) => {
    geocodeByAddress(newAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => {
        setSymptoms({ ...symptoms, location: latLng });
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
                  {firstHalfSymptoms.map((symptom, idx) => (
                    <FormGroup key={idx}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={symptoms.symptoms[symptom].isPresent}
                            onChange={() => toggleSymptom(Symptoms[symptom])}
                            name={Symptoms[symptom]}
                            color="primary"
                          />
                        }
                        label={camelCaseToLabel(Symptoms[symptom])}
                      />
                    </FormGroup>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {lastHalfSymptoms.map((symptom, idx) => (
                    <FormGroup key={idx}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={symptoms.symptoms[symptom].isPresent}
                            onChange={() => toggleSymptom(Symptoms[symptom])}
                            name={Symptoms[symptom]}
                            color="primary"
                          />
                        }
                        label={camelCaseToLabel(Symptoms[symptom])}
                      />
                    </FormGroup>
                  ))}
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
                // NOTE: actually need the parentheses around 'regions'
                // https://developers.google.com/places/supported_types#table3
                searchOptions={{ types: ['(regions)'] }}
                debounce={300}
                shouldFetchSuggestions={address.length > 2}
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
          <div>
            <IfFirebaseUnAuthed>
              {() => (
                <div>
                  <DialogTitle>Login</DialogTitle>
                  <DialogContent></DialogContent>
                </div>
              )}
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
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
            </IfFirebaseAuthed>
          </div>
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
