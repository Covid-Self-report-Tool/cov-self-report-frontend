import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import { CountryTable } from 'components';

export const List: FC = () => {
  return (
    <>
      <Typography variant="h2">Results by Country</Typography>
      <CountryTable />
    </>
  );
};
