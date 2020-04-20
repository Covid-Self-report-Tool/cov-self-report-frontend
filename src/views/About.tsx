import React, { FC, useEffect, useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { getAboutPage } from 'utils/api';
// TODO: restore w/dynamic from cloud stg.
// import { TermsAndCond } from 'components';

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

// Convenient to isolate this in order to simplify updates from source copy
// TODO: move into component instead of view

const AboutIntro: FC = () => {
  const [html, setHtml] = useState<string>('');
  const filename = 'about-page-full.html';

  useEffect(() => {
    getAboutPage(filename)
      .then(response => {
        setHtml(response.text);
      })
      .catch(err => console.error(err)); // TODO: handle this better
  }, []);

  return (
    <div>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CircularProgress size={30} />
      )}
    </div>
  );
};

export const About: FC = () => {
  const classes = useStyles();

  return (
    <Container className={`simpler-font ${classes.root}`}>
      <AboutIntro />
      {/* TODO: break it out */}
      {/* <TermsAndCond /> */}
    </Container>
  );
};
