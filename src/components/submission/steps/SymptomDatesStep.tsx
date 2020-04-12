import React, { FC } from 'react';
import {
  DialogTitle,
  DialogContent,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { SymptomForm, Symptoms, DispatchFormType } from 'types/submission';

type SymptomDatesStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const SymptomDatesStepType: FC<SymptomDatesStepType> = ({
  formState,
  dispatchForm,
}) => {
  return (
    <>
      <DialogTitle>When did you feel these?</DialogTitle>
      <DialogContent></DialogContent>
    </>
  );
};
