import React, { FC, useEffect, useState } from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';

import { WorldGraphLocation, CountryTable, TickerCards } from 'components';
import { IGeoJson, OurApiResponse, PositionType } from 'types';
import { BACKEND_URL } from 'config';

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

type MapboxType = {
  tilesetId: string;
};

type SubmittedType = {
  data: PositionType[];
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
  const [submitted, setSubmitted] = useState<number | null>(null);
  const [countryPolygons, setCountryPolygons] = useState<IGeoJson[]>([]);
  const [submittedFeats, setSubmittedFeats] = useState<PositionType[]>([]);
  const jhuApiUrl = 'https://api.covid19api.com/summary';

  // NOTE: some dummy data w/5k points if needed for clustering style work:
  // 'https://gist.githubusercontent.com/abettermap/099c2d469314cf90fcea0cc3c61643f5/raw/2df05ec61ca435a27a2dddbc1b624ad54a957613/fake-covid-pts.json'
  //
  // Comes back as text and different schema tho, need to parse:
  //
  //   const parsed = JSON.parse(response.text);
  //   setSubmittedFeats(parsed.features);
  //

  // CRED: https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435#30a3
  useEffect(() => {
    async function getSubmittedCases() {
      await superagent
        .get(`${BACKEND_URL}/self_report`)
        .set('Accept', 'application/json')
        .then((response: Readonly<OurApiResponse>) => {
          if (response.body) {
            setSubmittedFeats(response.body.data.locations);
            setSubmitted(response.body.data.locations.length);
          }
        })
        .catch(console.error);
    }

    getSubmittedCases();
  }, []);

  useEffect(() => {
    async function getCovidData() {
      await superagent
        .get(jhuApiUrl)
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
          <WorldGraphLocation
            data={countryPolygons}
            submittedFeats={submittedFeats}
          />
          <TickerCards
            confirmed={confirmed}
            deaths={deaths}
            recovered={recovered}
            submitted={submitted}
          />
        </Route>
      </RouteSwitch>
    </>
  );
};
