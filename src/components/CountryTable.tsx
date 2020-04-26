import React, { FC } from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery } from 'react-query';

import { getCountryGeoJSONData } from 'utils/api';

export const CountryTable: FC = () => {
  const { status, data: countries } = useQuery(
    'countryTotals',
    getCountryGeoJSONData,
    {
      staleTime: 300000,
    }
  );

  if (status !== 'success' || !countries) {
    return <></>;
  }

  const data = countries
    .map((country: any) => {
      const {
        country_name,
        total_deaths,
        total_confirmed,
        total_recovered,
        new_deaths,
        new_confirmed,
        new_recovered,
      } = country.properties;

      return [
        country_name,
        total_confirmed,
        new_confirmed,
        total_deaths,
        new_deaths,
        total_recovered,
        new_recovered,
      ];
    })
    // get rid of countries with no name
    .filter((country: Array<any>) => !!country[0]);

  const columns = [
    { name: 'Country ' },
    {
      name: 'Confirmed',
      options: {
        sortDirection: 'desc' as 'asc' | 'desc' | 'none' | undefined,
      },
    },
    { name: 'Confirmed (Day Change)' },
    { name: 'Deaths ' },
    { name: 'Deaths (Day Change) ' },
    { name: 'Recovered ' },
    { name: 'Recovered (Day Change) ' },
  ];

  return (
    <MUIDataTable
      title="Country Data"
      data={data}
      columns={columns}
      options={{
        selectableRows: 'none',
      }}
    />
  );
};
