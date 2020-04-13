import { BACKEND_URL } from 'config';
import { SymptomForm } from 'types/submission';

const superagent = require('superagent');

// Using Jason's gist until we have an endpoint in our own API. Tried GitLab raw
// file but CORS ruined the party. Worth noting, this actually worked:
// https://raw.githack.com/
const countriesUrl =
  'https://gist.githubusercontent.com/abettermap/aa507bbf8edcaff1d3137b976efede4b/raw/countries.json';

export const postFormData = (formData: SymptomForm, authorization: string) => {
  return superagent
    .post(`${BACKEND_URL}/self_report`)
    .set('Authorization', authorization)
    .send(formData);
};

// NOTE: should be able to switch to topojson for some big perf gains
export const getCountryData = async () => await superagent.get(countriesUrl);

export const getSubmittedCases = async () =>
  await superagent
    .get(`${BACKEND_URL}/self_report`)
    .set('Accept', 'application/json');

// TODO: these if they're going to be a thing
// export const getStateData
// export const getCountyData
