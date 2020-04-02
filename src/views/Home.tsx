import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { WorldGraphLocation } from 'components';
import { NotifierCard } from 'components/NotifierCard';

const superagent = require('superagent');

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
          <WorldGraphLocation data={covidData} region="Italy" />
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
