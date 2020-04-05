import React, { FC, useState } from 'react';
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

type ModalType = {
  isOpen: boolean;
  handleClose: () => void;
};

type Symptoms = {
  headache: boolean;
  fever: boolean;
  shortnessOfBreath: boolean;
  cough: boolean;
};

const getSteps = () => {
  return ['Symptoms', 'Location', 'Submit'];
};

export const Modal: FC<ModalType> = ({ isOpen, handleClose }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [symptoms, setSymptoms] = useState<Symptoms>({
    headache: false,
    fever: false,
    shortnessOfBreath: false,
    cough: false,
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

  const handleSelect = (newAddress: string) => {
    geocodeByAddress(newAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => console.log('Success', latLng))
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
                          checked={symptoms.cough}
                          onChange={() =>
                            setSymptoms({ ...symptoms, cough: !symptoms.cough })
                          }
                          name="cough"
                          color="primary"
                        />
                      }
                      label="Cough"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={symptoms.fever}
                          onChange={() =>
                            setSymptoms({ ...symptoms, fever: !symptoms.fever })
                          }
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
                          checked={symptoms.headache}
                          onChange={() =>
                            setSymptoms({
                              ...symptoms,
                              headache: !symptoms.headache,
                            })
                          }
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
                          checked={symptoms.shortnessOfBreath}
                          onChange={() =>
                            setSymptoms({
                              ...symptoms,
                              shortnessOfBreath: !symptoms.shortnessOfBreath,
                            })
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
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
            <DialogTitle>Login</DialogTitle>
            <DialogContent />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleBack}
          color="primary"
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button onClick={handleNext} color="primary">
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};
