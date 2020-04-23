import React, { FC, useContext } from 'react';
import { Container, Button } from '@material-ui/core';

import { triggerBadRequest } from 'utils/api';
import { Breadcrumb, GlobalContext } from 'components';

const TriggerNotFound: FC = () => {
  const { dispatch } = useContext(GlobalContext);

  const handleClick = (event: React.MouseEvent) => {
    triggerBadRequest().catch(err => {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Oops! Something went wrong',
          severity: 'error',
        },
      });
    });
  };

  return (
    <Button color="secondary" variant="contained" onClick={handleClick}>
      Trigger BS URL
    </Button>
  );
};

export const SecretSnackground: FC = () => (
  <Container className="simpler-font">
    <Breadcrumb to="/" text="< Home" />
    <h1>Super-secret Snackground</h1>
    <p>
      Easy way to test error/warning/success snackbars/alerts directly without a
      million steps.
    </p>
    <h2>BS URL</h2>
    <TriggerNotFound />
  </Container>
);
