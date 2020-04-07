import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  },
}));

// Ticker card title. Likely children: DefPopoverMenu component + ticker heading
export default function Title(props: { children?: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      variant="subtitle1"
      color="primary"
      className={useStyles().root}
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
