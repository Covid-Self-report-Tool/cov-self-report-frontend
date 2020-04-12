import React, { FC } from 'react';
import { SymptomForm, DispatchFormType } from 'types/submission';
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
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  dropdown: {
    marginTop: 10,
  },
  selector: {
    marginBottom: 10,
  },
});

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

  return (
    <>
      <DialogTitle id="form-dialog-title">Test Results</DialogTitle>
      <DialogContent>
        <Grid container>
          <FormControl>
            <FormLabel>Have you been tested for CoVID-19?</FormLabel>
            <RadioGroup
              value={String(formState.tested)}
              onChange={event => {
                dispatchForm({
                  type: 'SET_TESTED',
                  payload: event.target.value === 'true',
                });
              }}
            >
              <FormControlLabel control={<Radio value="true" />} label="Yes" />
              <FormControlLabel control={<Radio value="false" />} label="No" />
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
                  <MenuItem value={4}>Three</MenuItem>
                  <MenuItem value={5}>Three</MenuItem>
                </Select>
              </Grid>
              <FormControl>
                <FormLabel>Did you test positive?</FormLabel>
                <RadioGroup
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
            <FormControl>
              <FormLabel>Have you seen a physician?</FormLabel>
              <RadioGroup
                value={String(formState.seenPhysician)}
                onChange={event => {
                  dispatchForm({
                    type: 'SET_SEEN_PHYSICIAN',
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
          )}
          {formState.seenPhysician === true && (
            <FormControl>
              <FormLabel>What did your physician say?</FormLabel>
              <RadioGroup
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
