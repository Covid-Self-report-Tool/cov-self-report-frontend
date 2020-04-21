import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { AboutSection } from 'components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    '& a': {
      color: theme.palette.info.main,
    },
    '& a:hover': {
      cursor: 'pointer',
    },
  },
}));

export const About: FC = () => {
  const classes = useStyles();

  return (
    <Container className={`simpler-font ${classes.root}`}>
      <AboutSection filename="table-of-contents.html" />
      <AboutSection filename="intro.html" />
      <AboutSection filename="data-resources.html" />
      <AboutSection filename="team-information.html" />
      <AboutSection filename="our-partners.html" />
      <AboutSection filename="feedback.html" />
      <AboutSection filename="terms-and-conditions.html" />
      <AboutSection filename="privacy-policy.html" />
    </Container>
  );
};
