import React, { FC } from 'react';
import { SymptomForm, DispatchFormType } from 'context/types';
import {
  FormControlLabel,
  DialogTitle,
  DialogContent,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    padding: `4px ${theme.spacing(2)}px`,
  },
  dropdown: {
    marginTop: 10,
  },
  selector: {
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 20,
  },
  formLabel: {
    marginTop: theme.spacing(1),
  },
}));

type TestingStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const TestingStep: FC<TestingStepType> = ({
  formState,
  dispatchForm,
}) => {
  const classes = useStyles();

  const handlePhysicianDiagnosis = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchForm({ type: 'SET_DOCTOR_DIAGNOSIS', payload: event.target.value });
  };

  const handleBirthDate = (date: MaterialUiPickersDate) => {
    if (date) {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      dispatchForm({
        type: 'SET_BIRTH_DATE',
        payload: { birthMonth: month, birthYear: year },
      });
    }
  };

  const getBirthMonthYear = () => {
    const month = formState.birthMonth;
    const year = formState.birthYear;
    if (month && year) {
      const date = new Date();
      date.setFullYear(year);
      date.setMonth(month - 1);
      return date;
    }
    return null;
  };

  return (
    <>
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        Test Results
      </DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.datePicker}
                views={['year', 'month']}
                value={getBirthMonthYear()}
                onChange={handleBirthDate}
                maxDate={new Date()}
                label="Birth Month/Year"
              />
            </MuiPickersUtilsProvider>
            <FormLabel className={classes.formLabel}>
              Have you been tested for CoVID-19?
            </FormLabel>
            <RadioGroup
              row
              value={String(formState.tested)}
              onChange={event => {
                dispatchForm({
                  type: 'SET_TESTED',
                  payload: event.target.value === 'true',
                });
              }}
            >
              <FormControlLabel
                data-cy="tested-covid-yes"
                control={<Radio value="true" />}
                label="Yes"
              />
              <FormControlLabel
                data-cy="tested-covid-no"
                control={<Radio value="false" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          {formState.tested && (
            <>
              <Grid item xs={12}>
                <InputLabel
                  id="demo-simple-select-label"
                  className={classes.dropdown}
                >
                  How many times?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formState.numTimesTested}
                  className={classes.selector}
                  onChange={event =>
                    dispatchForm({
                      type: 'SET_NUM_TIMES_TESTED',
                      payload: event.target.value as number,
                    })
                  }
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                </Select>
              </Grid>
              <FormControl>
                <FormLabel className={classes.formLabel}>
                  Did you test positive?
                </FormLabel>
                <RadioGroup
                  row
                  value={String(formState.testedPositive)}
                  onChange={event => {
                    dispatchForm({
                      type: 'SET_TESTED_POSITIVE',
                      payload: event.target.value === 'true',
                    });
                  }}
                >
                  <FormControlLabel
                    control={<Radio value="true" />}
                    label="Yes"
                  />
                  <FormControlLabel
                    control={<Radio value="false" />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}
          {formState.tested === false && (
            <Grid item xs={12}>
              <FormControl>
                <FormLabel className={classes.formLabel}>
                  Have you seen a physician?
                </FormLabel>
                <RadioGroup
                  row
                  value={String(formState.seenPhysician)}
                  onChange={event => {
                    dispatchForm({
                      type: 'SET_SEEN_PHYSICIAN',
                      payload: event.target.value === 'true',
                    });
                  }}
                >
                  <FormControlLabel
                    control={
                      <Radio data-cy="seen-physician-yes" value="true" />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    control={
                      <Radio data-cy="seen-physician-no" value="false" />
                    }
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
          {formState.seenPhysician === true && (
            <FormControl>
              <FormLabel className={classes.formLabel}>
                What did your physician say?
              </FormLabel>
              <RadioGroup
                row
                value={String(formState.doctorDiagnosis)}
                onChange={handlePhysicianDiagnosis}
              >
                <FormControlLabel
                  control={<Radio value="suspected" />}
                  label="Suspected CoVID-19"
                />
                <FormControlLabel
                  control={<Radio value="inconclusive" />}
                  label="Inconclusive"
                />
                <FormControlLabel
                  control={<Radio value="negative" />}
                  label="Definitely not CoVID-19"
                />
              </RadioGroup>
            </FormControl>
          )}
        </Grid>
      </DialogContent>
    </>
  );
};
