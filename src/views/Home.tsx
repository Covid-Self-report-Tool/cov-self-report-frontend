import React, { FC, useEffect, useState } from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { WorldGraphLocation, CountryTable, NotifierCard } from 'components';
import { IGeoJson } from 'types';

const superagent = require('superagent');

// Should be able to switch to topojson for some big perf gains:
// https://github.com/topojson/world-atlas/
// https://www.jsdelivr.com/package/npm/world-atlas
const countryGeoJson = require('utils/countries.json');

const useStyles = makeStyles(theme => ({
  statsCardsWrap: {
    position: 'absolute',
    right: theme.spacing(4),
    top: '15vh',
    zIndex: 400,
  },
  paper: {
    backgroundColor: 'white',
    border: '2px solid #000',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(2),
    position: 'absolute',
    width: 400,
  },
}));

type Latest = {
  confirmed: number;
  deaths: number;
  recovered: number;
};

type StatsCardsTypes = {
  confirmed: number | null;
  deaths: number | null;
  recovered: number | null;
};

type ApiResponse = {
  body: {
    latest: Latest;
    locations: [
      {
        country: string;
        latest: Latest;
        province: string;
      }
    ];
  };
};

type GeoLocation = {
  [key: string]: {
    confirmed: number;
    dead: number;
    recovered: number;
    confirmed_day_change?: number;
    dead_day_change?: number;
    recovered_day_change?: number;
  };
};

const flattenLocations = (locations: GeoLocation): CountryTable => {
  const rows: CountryTable = [];
  Object.keys(locations).forEach(countryName => {
    const newRow = {
      name: countryName,
      ...locations[countryName],
    };

    rows.push(newRow);
  });

  return rows;
};

const StatsCards: FC<StatsCardsTypes> = ({ confirmed, deaths, recovered }) => (
  <div className={useStyles().statsCardsWrap}>
    <NotifierCard text="Recovered" number={recovered || -1} />
    <NotifierCard text="Confirmed Cases" number={confirmed || -1} />
    <NotifierCard text="Self-reported Cases" number={-1} />
    <NotifierCard text="Deaths" number={deaths || -1} />
  </div>
);

export const Home: FC = () => {
  const [covidData, setCovidData] = useState<CountryTable>([]);
  const [confirmed, setConfirmed] = useState<number | null>(null);
  const [deaths, setDeaths] = useState<number | null>(null);
  const [recovered, setRecovered] = useState<number | null>(null);
  const [features, setFeatures] = useState<IGeoJson[]>([]);

  useEffect(() => {
    superagent
      .get('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
      .set('Accept', 'application/json')
      .then((response: ApiResponse) => {
        const infectedByCountry: GeoLocation = {};
        setConfirmed(response.body.latest.confirmed);
        setDeaths(response.body.latest.deaths);
        setRecovered(response.body.latest.recovered);
        response.body.locations.forEach(location => {
          if (
            infectedByCountry[location.country] &&
            infectedByCountry[location.country].confirmed !== undefined
          ) {
            infectedByCountry[location.country].confirmed +=
              location.latest.confirmed;
            infectedByCountry[location.country].dead += location.latest.deaths;
            infectedByCountry[location.country].recovered +=
              location.latest.recovered;
          } else {
            infectedByCountry[location.country] = {
              confirmed: location.latest.confirmed,
              dead: location.latest.deaths,
              recovered: location.latest.recovered,
            };
          }
        });
        setCovidData(flattenLocations(infectedByCountry));
        console.log('covidData', infectedByCountry);
        const newFeatures: IGeoJson[] = [];

        console.log('countryGeoJson', countryGeoJson);
        countryGeoJson.features.forEach((feature: IGeoJson) => {
          if (feature.properties !== null) {
            const newFeature = { ...feature };

            if (
              newFeature.properties !== undefined &&
              infectedByCountry[feature.properties.name]
            ) {
              newFeature.properties.confirmed =
                infectedByCountry[feature.properties.name].confirmed;
            }
            newFeatures.push(newFeature);
          }
        });

        const geoJson: any = {
          type: 'FeatureCollection',
          features: newFeatures,
        };

        console.log(geoJson);

        setFeatures(geoJson);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <RouteSwitch>
        <Route path="/list" exact>
          <CountryTable data={covidData} />
        </Route>
        <Route>
          <WorldGraphLocation data={features} />
          <StatsCards
            confirmed={confirmed}
            deaths={deaths}
            recovered={recovered}
          />
        </Route>
      </RouteSwitch>
    </>
  );
};
