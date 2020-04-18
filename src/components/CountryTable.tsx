import React, { FC, useContext } from 'react';
import MUIDataTable from 'mui-datatables';

import { GlobalContext } from 'components';
import { IGeoJson } from 'types';

export const CountryTable: FC = () => {
  const { state } = useContext(GlobalContext);
  const data = state.countries
    .map((country: IGeoJson) => {
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
