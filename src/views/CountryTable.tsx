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
import { CountryTableType } from 'types';

export const CountryTable: FC<CountryTableType> = ({ data }) => {
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
              <TableCell align="right">Dead</TableCell>
              <TableCell align="right">Dead (Day Change)</TableCell>
              <TableCell align="right">Recovered</TableCell>
              <TableCell align="right">Recovered (Day Change)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(country => (
              <TableRow key={country.name}>
                <TableCell component="th" scope="row">
                  {country.name}
                </TableCell>
                <TableCell align="right">{country.confirmed}</TableCell>
                <TableCell align="right">
                  {country.confirmed_day_change}
                </TableCell>
                <TableCell align="right">{country.dead}</TableCell>
                <TableCell align="right">{country.dead_day_change}</TableCell>
                <TableCell align="right">{country.recovered}</TableCell>
                <TableCell align="right">
                  {country.recovered_day_change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
