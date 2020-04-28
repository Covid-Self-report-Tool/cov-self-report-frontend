import React, { FC, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Link } from 'react-router-dom';

import { camelCaseToLabel } from 'utils/strings';
import { SymptomForm, Symptoms, DispatchFormType } from 'context/types';
// TODO: maybe fancy upgrade later:
// https://github.com/mui-org/material-ui-pickers/releases/tag/v4.0.0-alpha.5

const useStyles = makeStyles(theme => ({
  margin: {
    marginLeft: 25,
    marginRight: 25,
  },
  center: {
    paddingTop: 30,
    paddingLeft: 10,
  },
  spacing: {
    marginLeft: 5,
    marginRight: 5,
  },
  marginTop: {
    marginTop: 20,
  },
  link: {
    color: theme.palette.grey['900'], // can't use theme here?
  },
}));

type SymptomStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
  setActiveStep: Function;
};

export const SymptomStep: FC<SymptomStepType> = ({
  formState,
  dispatchForm,
  setActiveStep,
}) => {
  const classes = useStyles();
  // This is to create a grid layout, split into two groups
  const allSymptoms = Object.keys(Symptoms) as Array<keyof typeof Symptoms>;
  const halfwayThrough = Math.floor(allSymptoms.length / 2);
  const firstHalfSymptoms: Array<keyof typeof Symptoms> = allSymptoms.splice(
    0,
    halfwayThrough
  );
  const lastHalfSymptoms: Array<keyof typeof Symptoms> = allSymptoms;
  const [showDates, setShowDates] = useState<boolean>(false);

  const hasSymptoms = () => {
    return getSymptoms().length > 0;
  };

  // this should not return an array of string
  const getSymptoms = () => {
    return Object.keys(formState.symptoms).filter(
      // @ts-ignore
      (symptom: any) => formState.symptoms[symptom].isPresent
    );
  };

  const handleStartDateChange = (
    date: Date | null,
    symptom: keyof typeof Symptoms
  ) => {
    dispatchForm({
      type: 'SET_SYMPTOM_START_DATE',
      // @ts-ignore
      payload: { symptom: symptom, startDate: date },
    });
  };

  const handleEndDateChange = (
    date: Date | null,
    symptom: keyof typeof Symptoms
  ) => {
    dispatchForm({
      type: 'SET_SYMPTOM_END_DATE',
      // @ts-ignore
      payload: { symptom: symptom, endDate: date },
    });
  };

  const noSymptoms = () => {
    dispatchForm({
      type: 'RESET_SYMPTOMS',
    });
    setActiveStep(1);
  };

  return (
    <>
      {!showDates ? (
        <>
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
        </>
      ) : (
        <>
          <DialogTitle>When did you have these symptoms?</DialogTitle>
          <DialogContent>
            <Grid container>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {getSymptoms().map((
                  symptom: any // TODO: fix type any
                ) => (
                  <>
                    <Grid item xs={4}>
                      <Typography className={classes.center}>
                        {camelCaseToLabel(symptom)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <KeyboardDatePicker
                        className={classes.spacing}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Start Date"
                        maxDate={new Date()}
                        // @ts-ignore
                        value={formState.symptoms[symptom].startDate}
                        onChange={date =>
                          handleStartDateChange(date, symptom as any)
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <KeyboardDatePicker
                        className={classes.spacing}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="End Date"
                        // @ts-ignore
                        minDate={formState.symptoms[symptom].startDate}
                        maxDate={new Date()}
                        // @ts-ignore
                        value={formState.symptoms[symptom].endDate}
                        onChange={date =>
                          handleEndDateChange(date, symptom as any)
                        }
                      />
                    </Grid>
                  </>
                ))}
              </MuiPickersUtilsProvider>
            </Grid>
          </DialogContent>
        </>
      )}
      <Grid container>
        <Grid item xs={4}>
          <Button
            className={classes.margin}
            variant="contained"
            onClick={() => noSymptoms()}
          >
            I have no symptoms
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.marginTop}>
        <Grid item xs={6}>
          <Button className={classes.margin} variant="contained">
            <Link to="/login" className={classes.link}>
              Already have an account?
            </Link>
          </Button>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          <Button
            className={classes.margin}
            onClick={() => setShowDates(!showDates)}
            variant="outlined"
            disabled={!showDates && !hasSymptoms()}
          >
            {showDates ? 'Go Back to Symptoms' : 'Set Symptom Dates'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
