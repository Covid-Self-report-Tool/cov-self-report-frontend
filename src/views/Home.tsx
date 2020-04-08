import React, { FC, useEffect, useState } from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { WorldGraphLocation, CountryTable, NotifierCard } from 'components';
import { IGeoJson } from 'types';

const superagent = require('superagent');

// Should be able to switch to topojson for some big perf gains
const countryGeoJson = require('utils/countries.min.json'); // TODO: fetch

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

type StatsCardsTypes = {
  confirmed: number | null;
  deaths: number | null;
  recovered: number | null;
};

type ApiResponse = {
  body: {
    Global: {
      NewConfirmed: number;
      TotalConfirmed: number;
      NewDeaths: number;
      TotalDeaths: number;
      NewRecovered: number;
      TotalRecovered: number;
    };
    Countries: [
      {
        Country: string;
        CountryCode: string;
        Slug: string;
        NewConfirmed: number;
        TotalConfirmed: number;
        NewDeaths: number;
        TotalDeaths: number;
        NewRecovered: number;
        TotalRecovered: number;
        Date: string;
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
  const [countryPolygons, setCountryPolygons] = useState<IGeoJson[]>([]);
  const url = 'https://api.covid19api.com/summary';

  useEffect(() => {
    async function getCovidData() {
      await superagent
        .get(url)
        .set('Accept', 'application/json')
        .then((response: ApiResponse) => {
          const infectedByCountry: GeoLocation = {};

          setConfirmed(response.body.Global.TotalConfirmed);
          setDeaths(response.body.Global.TotalDeaths);
          setRecovered(response.body.Global.TotalRecovered);

          response.body.Countries.forEach(location => {
            infectedByCountry[location.CountryCode] = {
              confirmed: location.TotalConfirmed,
              dead: location.TotalDeaths,
              recovered: location.TotalRecovered,
            };
          });

          setCovidData(flattenLocations(infectedByCountry));
          const newFeatures: IGeoJson[] = countryGeoJson.features.map(
            (feature: IGeoJson) => {
              const correspondingRow =
                infectedByCountry[feature.properties.ISO_A2] || {};

              return {
                ...feature,
                properties: {
                  ...feature.properties,
                  confirmed: correspondingRow.confirmed || null,
                },
              };
            }
          );

          const geoJson: any = {
            type: 'FeatureCollection',
            features: newFeatures,
          };

          setCountryPolygons(geoJson);
        })
        .catch(console.error);
    }

    getCovidData();
  }, []);

  return (
    <>
      <RouteSwitch>
        <Route path="/list" exact>
          <CountryTable data={covidData} />
        </Route>
        <Route>
          <WorldGraphLocation data={countryPolygons} />
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
