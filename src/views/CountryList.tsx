import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import { CountryTable, AboutSection } from 'components';

export const List: FC = () => {
  return (
    <div>
      <Typography variant="h2">Results by Country</Typography>
      <CountryTable />
      <AboutSection filename="data-license.html" />
    </div>
  );
};
