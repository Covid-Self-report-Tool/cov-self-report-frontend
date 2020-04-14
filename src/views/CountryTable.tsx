import React, { FC } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';

import { useStore } from 'components';
import { IGeoJson } from 'types';

export const CountryTable: FC = () => {
  const store = useStore();
  const data = store.countries;

  return (
    <>
      <Typography variant="h2">Results by Country</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Confirmed</TableCell>
              <TableCell align="right">Confirmed (Day Change)</TableCell>
              <TableCell align="right">total_deaths</TableCell>
              <TableCell align="right">total_deaths (Day Change)</TableCell>
              <TableCell align="right">Recovered</TableCell>
              <TableCell align="right">Recovered (Day Change)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((country: IGeoJson) => {
              const {
                country_code,
                total_deaths,
                total_confirmed,
                total_recovered,
                confirmed_day_change,
                dead_day_change,
                recovered_day_change,
              } = country.properties;

              return (
                <TableRow key={country_code}>
                  <TableCell component="th" scope="row">
                    {country_code}
                  </TableCell>
                  <TableCell align="right">{total_confirmed}</TableCell>
                  <TableCell align="right">{confirmed_day_change}</TableCell>
                  <TableCell align="right">{total_deaths}</TableCell>
                  <TableCell align="right">{dead_day_change}</TableCell>
                  <TableCell align="right">{total_recovered}</TableCell>
                  <TableCell align="right">{recovered_day_change}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
