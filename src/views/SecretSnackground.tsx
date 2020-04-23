import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { Breadcrumb } from 'components';

export const SecretSnackground: FC = () => (
  <Container className={`simpler-font`}>
    <Breadcrumb to="/" text="< Home" />
    <h1>Super-secret Snackground</h1>
    <p>
      Easy way to test error/warning/success snackbars/alerts directly without a
      million steps.
    </p>
  </Container>
);
