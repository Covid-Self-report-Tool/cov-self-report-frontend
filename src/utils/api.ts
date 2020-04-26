import { queryCache } from 'react-query';

import { BACKEND_URL, CLOUD_HTML_BASE_URL } from 'config';
import { SymptomForm } from 'context/types';
import { IGeoJson, CountryRow } from 'types';
import { GeoJSONCollection } from 'types/api';
import { htmlPages } from 'views';

const superagent = require('superagent');

export const postFormData = (formData: SymptomForm, authorization: string) => {
  return superagent
    .post(`${BACKEND_URL}/self_report`)
    .set('Authorization', authorization)
    .send(formData);
};

export const getUserData = (authorization: string) => {
  return superagent
    .get(`${BACKEND_URL}/user`)
    .set('Authorization', authorization)
    .set('Accept', 'application/json');
};

// TODO: switch to topojson or vector tiles for some perf gains
export const getGeoJSONCountries = (): GeoJSONCollection =>
  require('data/countries.min.json');

export const getCountryData = async () => {
  return superagent
    .get(`${BACKEND_URL}/countries`)
    .set('Accept', 'application/json');
};

export const getCountryGeoJSONData = async () => {
  const geoJSON = await getGeoJSONCountries();
  const countryData = await getCountryData();
  // not sure why this returns text and not json
  const countries = JSON.parse(countryData['text'])['data'];
  const propertiesHash: { [key: string]: Object } = {};

  // make a hash to avoid big O^2
  countries['countries'].forEach((country: CountryRow) => {
    propertiesHash[country['country_code']] = { ...country };
  });

  const geoJSONCountries = geoJSON['features'].map((feature: IGeoJson) => {
    if (
      feature['properties']['ISO_A2'] !== undefined &&
      feature['properties']['ISO_A2'] in propertiesHash
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

export const getSubmittedCases = async () => {
  return await superagent
    .get(`${BACKEND_URL}/self_report`)
    .set('Accept', 'application/json')
    .then((response: any) => response.body.data.locations);
};

// TODO: these if they're going to be a thing
// export const getStateData
// export const getCountyData

export const getHtmlFromS3 = async (filename: string) =>
  await superagent
    .get(`${CLOUD_HTML_BASE_URL}/${filename}`)
    .set('Accept', 'text/html; charset=utf8');

export const triggerBadRequest = async () =>
  await superagent.get('http://superfake.biz/400');

export const bootstrapApp = async () => {
  await prefetchAboutData();
};

const prefetchAboutData = async () => {
  htmlPages.forEach(async page => {
    await queryCache.prefetchQuery(page, getHtmlFromS3, {
      staleTime: Infinity,
    });
  });
};
