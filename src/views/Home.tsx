import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { WorldGraphLocation } from 'components';
import { NotifierCard } from 'components/NotifierCard';
import { IGeoJson } from 'types';

const superagent = require('superagent');
const countryGeoJson = require('utils/countries.json');

type ApiResponse = {
  body: {
    latest: {
      confirmed: number;
      deaths: number;
      recovered: number;
    };
    locations: [
      {
        country: string;
        latest: {
          confirmed: number;
          deaths: number;
          recovered: number;
        };
        province: string;
      }
    ];
  };
};

type CountryInfected = {
  [key: string]: number;
};

type GeoLocation = [string, any];

type GeoData = GeoLocation[];

export const Home: FC = () => {
  const [covidData, setCovidData] = useState<GeoData>([
    ['Country', 'Infected'],
  ]);
  const [confirmed, setConfirmed] = useState<number | null>(null);
  const [deaths, setDeaths] = useState<number | null>(null);
  const [recovered, setRecovered] = useState<number | null>(null);
  const [features, setFeatures] = useState<IGeoJson[]>([]);

  useEffect(() => {
    superagent
      .get('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
      .set('Accept', 'application/json')
      .then((response: ApiResponse) => {
        let infectedByCountry: CountryInfected = {};
        console.log(response.body);
        setConfirmed(response.body.latest.confirmed);
        setDeaths(response.body.latest.deaths);
        setRecovered(response.body.latest.recovered);
        response.body.locations.forEach(location => {
          if (infectedByCountry[location.country] !== undefined) {
            infectedByCountry[location.country] += location.latest.confirmed;
          } else {
            infectedByCountry[location.country] = location.latest.confirmed;
          }
        });
        setCovidData([
          ['Country', 'Infected'],
          ...Object.entries(infectedByCountry),
        ]);
        const newFeatures: IGeoJson[] = [];

        countryGeoJson.features.forEach((feature: IGeoJson) => {
          if (feature.properties !== null) {
            const newFeature = { ...feature };

            newFeature.properties.confirmed =
              infectedByCountry[feature.properties.name];
            newFeatures.push(newFeature);
          }
        });

        const geoJson: any = {
          type: 'FeatureCollection',
          features: newFeatures,
        };

        setFeatures(geoJson);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <Typography variant="h2" align="center">
        Covid-19 Tracker
      </Typography>
      <Grid container>
        <Grid item xs={10}>
          <WorldGraphLocation data={features} />
        </Grid>
        <Grid item xs={2}>
          {confirmed !== null && (
            <Grid item xs={12}>
              <NotifierCard text="Confirmed" number={confirmed} />
            </Grid>
          )}
          {deaths !== null && (
            <Grid item xs={12}>
              <NotifierCard text="Deaths" number={deaths} />
            </Grid>
          )}
          {recovered !== null && recovered !== 0 && (
            <Grid item xs={12}>
              <NotifierCard text="Recovered" number={recovered} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
