import React, { FC, useEffect } from 'react';
import { SymptomForm, DispatchFormType } from 'types/submission';
import {
  FormControlLabel,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  textField: {
    marginTop: 0,
    marginBottom: 20,
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

  // reset everything if you change tested
  useEffect(() => {
    if (formState.tested === false) {
      // dispatchForm({ type: 'RESET_VALUE', payload: 'seenPhysician' });
    }
  }, [formState.tested]);

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
              <TextField
                label="Number of times tested"
                type="number"
                className={classes.textField}
                fullWidth
                inputProps={{ min: '0', max: '10', step: '1' }}
                value={formState.numTimesTested}
                onChange={event =>
                  dispatchForm({
                    type: 'SET_NUM_TIMES_TESTED',
                    payload: parseInt(event.target.value, 10),
                  })
                }
              />
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
          {formState.seenPhysician === false && (
            <FormControl>
              <FormLabel>What did your physician say?</FormLabel>
              <RadioGroup
                value={String(formState.doctorSuspects)}
                onChange={event => {
                  dispatchForm({
                    type: 'SET_SEEN_PHYSICIAN',
                    payload: event.target.value === 'true',
                  });
                }}
              >
                <FormControlLabel
                  control={<Radio value="true" />}
                  label="Suspected CoVID-19"
                />
                <FormControlLabel
                  control={<Radio value="false" />}
                  label="Inconclusive"
                />
                <FormControlLabel
                  control={<Radio value="false" />}
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
