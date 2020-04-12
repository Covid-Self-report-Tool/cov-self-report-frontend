import React, { FC } from 'react';
import {
  DialogTitle,
  DialogContent,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { camelCaseToLabel } from 'utils/strings';
import { SymptomForm, Symptoms, DispatchFormType } from 'types/submission';

type SymptomStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const SymptomStep: FC<SymptomStepType> = ({
  formState,
  dispatchForm,
}) => {
  // This is to create a grid layout, split into two groups
  const allSymptoms = Object.keys(Symptoms) as Array<keyof typeof Symptoms>;
  const halfwayThrough = Math.floor(allSymptoms.length / 2);
  const firstHalfSymptoms: Array<keyof typeof Symptoms> = allSymptoms.splice(
    0,
    halfwayThrough
  );
  const lastHalfSymptoms: Array<keyof typeof Symptoms> = allSymptoms;

  return (
    <>
      <DialogTitle id="form-dialog-title">What are your symptoms?</DialogTitle>
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
  );
};
