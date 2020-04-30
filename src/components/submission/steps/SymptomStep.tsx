import React, { FC, useState, useContext } from 'react';
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

import { camelCaseToLabel } from 'utils/strings';
import { UserContext } from 'context';
import { Symptoms } from 'context/types';
// TODO: maybe fancy upgrade later:
// https://github.com/mui-org/material-ui-pickers/releases/tag/v4.0.0-alpha.5

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    padding: `4px ${theme.spacing(2)}px`,
  },
  center: {
    paddingTop: 30,
    paddingLeft: 10,
  },
  checkbox: {
    padding: 4,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    },
  },
  dialogContent: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
  },
  firstPageBtnsWrap: {
    marginTop: theme.spacing(1),
    marginBottom: 4,
  },
  datePicker: {
    marginLeft: 5,
    marginRight: 5,
  },
  marginTop: {
    marginTop: 20,
  },
  link: {
    color: theme.palette.grey['900'],
  },
}));

type SymptomStepType = {
  setActiveStep: Function;
};

export const SymptomStep: FC<SymptomStepType> = ({ setActiveStep }) => {
  const classes = useStyles();
  const { state: formState, dispatch: dispatchForm } = useContext(UserContext);

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
          <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
            What are your symptoms?
          </DialogTitle>
          <DialogContent dividers className={classes.dialogContent}>
            <Grid container>
              <Grid item xs={6}>
                {firstHalfSymptoms.map((symptom, idx) => (
                  <FormGroup key={idx}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          className={classes.checkbox}
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
                          size="small"
                          className={classes.checkbox}
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
            <Grid
              container
              justify="center"
              className={classes.firstPageBtnsWrap}
            >
              <Grid item>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => noSymptoms()}
                >
                  I have no symptoms
                </Button>
              </Grid>
              <Grid item xs={1} />
              <Grid item>
                <Button
                  size="small"
                  onClick={() => setShowDates(!showDates)}
                  color="secondary"
                  variant="contained"
                  disabled={!showDates && !hasSymptoms()}
                >
                  Set Symptom Dates
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle className={classes.dialogTitle}>
            When did you have these symptoms?
          </DialogTitle>
          <DialogContent dividers className={classes.dialogContent}>
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
                        className={classes.datePicker}
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
                        className={classes.datePicker}
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
            <Grid container justify="center">
              <Grid item>
                <Button
                  size="small"
                  onClick={() => setShowDates(!showDates)}
                  variant="outlined"
                >
                  Go Back to Symptoms
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </>
  );
};
