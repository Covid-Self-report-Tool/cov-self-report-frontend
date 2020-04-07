import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// Other non-Home views need it
// TODO: put into more generic file since it's not About-specific
export const centeredContStyles = makeStyles(theme => ({
  root: {
    marginTop: '10rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.sm,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values.md,
    },
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(12),
    fontFamily: `'Roboto', sans-serif`,
  },
}));

export const About: FC = () => {
  const sharedStyles = centeredContStyles();
  const styles = useStyles();
  const allStyles = clsx(sharedStyles.root, styles.root);

  return (
    <Container className={allStyles}>
      <h1>About this project</h1>
    </Container>
  );
};
