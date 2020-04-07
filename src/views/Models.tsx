import React, { FC } from 'react';
import { Typography, Container } from '@material-ui/core';

import { centeredContStyles } from '../views/About';

export const Models: FC = () => {
  return (
    <Container maxWidth="md" className={centeredContStyles().root}>
      <Typography variant="h2">Predictive Models</Typography>
    </Container>
  );
};
