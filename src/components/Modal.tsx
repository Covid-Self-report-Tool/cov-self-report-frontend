import React, { useState, useReducer } from 'react';
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
  Link,
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
import firebase from 'firebase';
import { SymptomForm, Symptoms, Location } from 'types';
import { postFormData } from 'utils/api';
import { camelCaseToLabel } from 'utils/strings';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';

const getSteps = () => {
  return ['Symptoms', 'Location', 'Submit'];
};

const initialFormState: SymptomForm = {
  symptoms: {
    fever: { isPresent: false },
    headache: { isPresent: false },
    shortnessOfBreath: { isPresent: false },
    reducedSenseOfSmell: { isPresent: false },
    reducedSenseOfTaste: { isPresent: false },
    runnyNose: { isPresent: false },
    wheezing: { isPresent: false },
    chestPain: { isPresent: false },
    dizziness: { isPresent: false },
    bodyAche: { isPresent: false },
    lightHeadedness: { isPresent: false },
    confusion: { isPresent: false },
    fatigue: { isPresent: false },
    exhaustion: { isPresent: false },
    soreThroat: { isPresent: false },
    nausea: { isPresent: false },
    dryCough: { isPresent: false },
    wetCough: { isPresent: false },
  },
  location: null,
  email: null,
  birthMonth: null,
  birthYear: null,
  address: undefined,
  phoneNumber: null,
  numTimesTested: null,
  testedPositive: null,
  seenADoctor: null,
  doctorSuspects: null,
  doctorInconclusive: null,
};

type Action =
  | { type: 'TOGGLE_SYMPTOM'; payload: Symptoms }
  | { type: 'SET_VALUE' }
  | { type: 'SET_SYMPTOM_START_DATE' }
  | { type: 'SET_SYMPTOM_END_DATE' }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_LOCATION'; payload: Location };

const reducer = (state: SymptomForm, action: Action): SymptomForm => {
  switch (action.type) {
    case 'TOGGLE_SYMPTOM':
      const newForm = { ...state };
      newForm.symptoms[action.payload].isPresent = !state.symptoms[
        action.payload
      ].isPresent;
      return newForm;
    case 'SET_SYMPTOM_START_DATE':
      return { ...state };
    case 'SET_SYMPTOM_END_DATE':
      return { ...state };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export const Modal = () => {
  const [user] = useAuthState(firebase.auth());
  const [activeStep, setActiveStep] = useState<number>(0);
  const [register, setRegister] = useState<boolean>(true);

  const [formState, dispatchForm] = useReducer(reducer, initialFormState);

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

  const submitForm = () => {
    if (user) {
      user.getIdToken(true).then(idToken => {
        postFormData(formState, idToken)
          .then((res: any) => {
            console.log(`got back ${res}`);
            history.push('/');
          })
          .catch((err: any) => {
            console.error(err);
            history.push('/');
          });
      });
    }
  };

  const handleSelectAddress = (newAddress: string) => {
    geocodeByAddress(newAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: Location) => {
        dispatchForm({ type: 'SET_ADDRESS', payload: newAddress });
        dispatchForm({ type: 'SET_LOCATION', payload: latLng });
      })
      .catch(alert); // better than console error for now
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
                            checked={formState.symptoms[symptom].isPresent}
                            onChange={() =>
                              dispatchForm({
                                type: 'TOGGLE_SYMPTOM',
                                payload: Symptoms[symptom],
                              })
                            }
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
                            checked={formState.symptoms[symptom].isPresent}
                            onChange={() =>
                              dispatchForm({
                                type: 'TOGGLE_SYMPTOM',
                                payload: Symptoms[symptom],
                              })
                            }
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
                value={formState.address}
                onChange={value =>
                  dispatchForm({
                    type: 'SET_ADDRESS',
                    payload: value,
                  })
                }
                onSelect={handleSelectAddress}
                // NOTE: actually need the parentheses around 'regions'
                // https://developers.google.com/places/supported_types#table3
                searchOptions={{ types: ['(regions)'] }}
                debounce={300}
                shouldFetchSuggestions={
                  !!formState.address && formState.address.length > 2
                }
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
                  {register ? (
                    <div>
                      <DialogTitle>Register</DialogTitle>
                      <DialogContent>
                        <SignupForm />
                        <Link href="#" onClick={() => setRegister(!register)}>
                          Already a User?
                        </Link>
                      </DialogContent>
                    </div>
                  ) : (
                    <div>
                      <DialogTitle>Login</DialogTitle>
                      <DialogContent>
                        <LoginForm />
                        <Link href="#" onClick={() => setRegister(!register)}>
                          Need to Register?
                        </Link>
                      </DialogContent>
                    </div>
                  )}
                </div>
              )}
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
              {() => (
                <div>
                  <DialogTitle>Terms</DialogTitle>
                  <DialogContent>
                    <FirebaseAuthConsumer>
                      {({ user }) => <span>Logged in as {user.email}</span>}
                    </FirebaseAuthConsumer>
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label={
                        <span>
                          I Agree to the{' '}
                          <Link href="#">Terms and Conditions</Link>
                        </span>
                      }
                    />
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
              <Button
                onClick={handleNext}
                color="primary"
                disabled={activeStep === 1 && !formState.location}
              >
                Next
              </Button>
            ) : (
              <Button onClick={submitForm} color="primary" disabled={!user}>
                Submit
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </FirebaseAuthConsumer>
  );
};
