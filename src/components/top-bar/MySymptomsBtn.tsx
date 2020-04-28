import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { MuiClassList } from 'types/top-bar';

export const MySymptomsBtn: FC<MuiClassList> = ({ classes }) => (
  <Button
    variant="contained"
    color="secondary"
    to="/self-report"
    className={`${classes.appBarBtns} ${classes.snugBtnMobile}`}
    component={RouteLink}
  >
    My Case
  </Button>
);
