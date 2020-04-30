import React, { FC, useContext } from 'react';
import { Container, Button } from '@material-ui/core';

import { triggerBadRequest, getHtmlFromS3 } from 'utils/api';
import { Breadcrumb, GlobalContext } from 'components';

const ErrorTriggerBtns: FC = () => {
  const { dispatch } = useContext(GlobalContext);

  const handleBSurlClick = async () => {
    try {
      await triggerBadRequest();
    } catch {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Oops! Something went wrong',
          severity: 'error',
        },
      });
    }
  };

  const handleBadHelpClick = async () => {
    try {
      await getHtmlFromS3('not-real.html');
    } catch (err) {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Something went wrong. Could not get content.',
          severity: 'error',
        },
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBadHelpClick}
      >
        Trigger Bad About
      </Button>
      <Button color="secondary" variant="contained" onClick={handleBSurlClick}>
        Trigger BS URL
      </Button>
    </div>
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
    <ErrorTriggerBtns />
  </Container>
);
