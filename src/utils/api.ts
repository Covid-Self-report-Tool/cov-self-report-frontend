import { BACKEND_URL } from 'config';
import { SymptomForm } from 'types';

const superagent = require('superagent');

export const postFormData = (formData: SymptomForm) => {
  return superagent.post(`${BACKEND_URL}/self_report`).send(formData);
};

// export const getSuspectedCases

// export const getCountryData

// export const getStateData

// export const getCountyData
