import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    lineHeight: 1,
    fontSize: '1rem',
  },
}));

// Ticker card title. Likely children: DefPopoverMenu component + ticker heading
export default function Title(props: { children?: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      variant="subtitle2"
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
