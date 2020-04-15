import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import { CountryTable } from 'components';

export const List: FC = () => {
  return (
    <div>
      <Typography variant="h2">Results by Country</Typography>
      <CountryTable />
    </div>
  );
};
