import React, { FC, useContext } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

import { getHtmlFromS3 } from 'utils/api';
import { GlobalContext } from 'components';

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

interface AboutContTypes {
  children: React.ReactNode;
}

interface AboutType {
  filename: string;
}

interface BreadcrumbType {
  text: string;
  to: string;
}

// Jumping-off/lead paragraphs to feedback, service terms, and privacy policy
export const AboutFooter: FC = () => (
  <section>
    <h2 id="feedback">Feedback</h2>
    <p>
      Please contact us by filling out
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfkQJMihQUlA6scYvjr1A1OZiXGRRxQLkD1YIiklGDq5YTclQ/viewform?usp=sf_link"
      >
        this short form
      </a>
      .
    </p>
    <h2 id="terms-of-service">Terms of Service</h2>
    <p>
      Read about our{' '}
      <RouteLink to="/terms-of-service">terms of service</RouteLink>.
    </p>
    <h2 id="privacy-policy">Privacy Policy</h2>
    <p>
      Read more about{' '}
      <RouteLink to="/privacy-policy">how we use your data</RouteLink>.
    </p>
  </section>
);

export const AboutSection: FC<AboutType> = ({ filename }) => {
  const { status, data } = useQuery(filename, getHtmlFromS3, {
    staleTime: Infinity,
  });
  const { state, dispatch } = useContext(GlobalContext);

  if (status === 'error') {
    if (!state.uiAlert.open) {
    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Something went wrong. Could not get content.',
        severity: 'error',
      },
    });
  }
  }

  return (
    <div>{data && <div dangerouslySetInnerHTML={{ __html: data.text }} />}</div>
  );
};

export const AboutContainer: FC<AboutContTypes> = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={`simpler-font ${classes.root}`}>{children}</Container>
  );
};

export const Breadcrumb: FC<BreadcrumbType> = ({ text, to }) => (
  <>
    {to !== '/' && (
      <Typography component="span" color="primary">
        <small>{` < `}</small>
      </Typography>
    )}
    <Link component={RouteLink} to={to}>
      {text}
    </Link>
  </>
);
