import { BACKEND_URL } from 'config';
import { SymptomForm } from 'types/submission';

const superagent = require('superagent');
const countriesUrl = '/countries.min.json';

export const postFormData = (formData: SymptomForm, authorization: string) => {
  return superagent
    .post(`${BACKEND_URL}/self_report`)
    .set('Authorization', authorization)
    .send(formData);
};

// NOTE: should be able to switch to topojson for some big perf gains
export const getCountryData = async () =>
  await superagent.get(countriesUrl).set('Accept', 'application/json');

export const getSubmittedCases = async () =>
  await superagent
    .get(`${BACKEND_URL}/self_report`)
    .set('Accept', 'application/json');

// TODO: these if they're going to be a thing
// export const getStateData
// export const getCountyData
