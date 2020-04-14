import { BACKEND_URL } from 'config';
import { SymptomForm } from 'types/submission';
import { IGeoJson, CountryRow } from 'types';
import { GeoJSONCollection } from 'types/api';

const superagent = require('superagent');

// CRED: for permalink: https://gist.github.com/atenni/5604615
// Using Jason's gist until we have an endpoint in our own API. Tried GitLab raw
// file but CORS ruined the party. Worth noting, this actually worked:
// https://raw.githack.com/
const countriesUrl = `${BACKEND_URL}/countries`;

export const postFormData = (formData: SymptomForm, authorization: string) => {
  return superagent
    .post(`${BACKEND_URL}/self_report`)
    .set('Authorization', authorization)
    .send(formData);
};

// NOTE: should be able to switch to topojson for some big perf gains
export const getGeoJSONCountries = (): GeoJSONCollection =>
  require('countries.min.json');
//superagent.get(countriesUrl);
export const getCountryData = async () => {
  return superagent
    .get(`${BACKEND_URL}/countries`)
    .set('Accept', 'application/json');
};

export const getCountryGeoJSONData = async () => {
  const geoJSON = await getGeoJSONCountries();
  const countryData = await getCountryData();
  const countries = JSON.parse(countryData['text'])['data'];
  const propertiesHash: { [key: string]: Object } = {};

  countries['countries'].map((country: CountryRow) => {
    propertiesHash[country['country_code']] = { ...country };
  });
  const geoJSONCountries = geoJSON['features'].map((feature: IGeoJson) => {
    if (
      'ISO_A2' in feature['properties'] &&
      feature['properties']['ISO2'] in propertiesHash
    ) {
      return {
        ...feature,
        properties: propertiesHash[feature['properties']['ISO_A2']],
      };
    }
    return { ...feature };
  });

  return geoJSONCountries;
};

export const combineCountryGeoJSON = (countryData: any, geoJSON: Object) => {
  // if ('countries' in countryData['data']) {
  //   combinedData = countryData['data']['countries'].map()
  // }
};

export const getSubmittedCases = async () =>
  await superagent
    .get(`${BACKEND_URL}/self_report`)
    .set('Accept', 'application/json');

// TODO: these if they're going to be a thing
// export const getStateData
// export const getCountyData
