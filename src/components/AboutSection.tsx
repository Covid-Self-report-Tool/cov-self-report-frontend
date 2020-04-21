import React, { FC, useEffect, useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { getHtmlFromS3 } from 'utils/api';

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

export const AboutSection: FC<AboutType> = ({ filename }) => {
  const [html, setHtml] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getHtmlFromS3(filename)
      .then(response => {
        setHtml(response.text);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      {error && (
        <Alert severity="error" variant="filled">
          Could not get {filename}
        </Alert>
      )}
    </div>
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
