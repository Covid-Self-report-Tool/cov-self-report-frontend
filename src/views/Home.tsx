import React, { FC, useEffect, useState } from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';

import { WorldGraphLocation, CountryTable, TickerCards } from 'components';
import { IGeoJson } from 'types';

const superagent = require('superagent');

// Should be able to switch to topojson for some big perf gains
const countryGeoJson = require('utils/countries.min.json'); // TODO: fetch

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
          <TickerCards
            confirmed={confirmed}
            deaths={deaths}
            recovered={recovered}
          />
        </Route>
      </RouteSwitch>
    </>
  );
};
