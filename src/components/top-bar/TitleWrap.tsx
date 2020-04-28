import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { MuiClassList } from 'types/top-bar';

export const TitleWrap: FC<MuiClassList> = ({ classes }) => (
  <Typography
    to="/"
    component={RouteLink}
    className={`${classes.title} MuiTypography-noWrap`}
  >
    <span className="MuiTypography-noWrap" style={{ lineHeight: 1 }}>
      Covid-19 Self-reporting Tool
    </span>
    <Typography
      component="p"
      variant="subtitle2"
      noWrap
      className={classes.subTitle}
    >
      An open data tool that tracks self-reported and confirmed infections
    </Typography>
  </Typography>
);
