import React, { FC, useEffect, useState, useContext } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

export const AboutSection: FC<AboutType> = ({ filename }) => {
  const [html, setHtml] = useState<string>('');
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    getHtmlFromS3(filename)
      .then(response => {
        setHtml(response.text);
      })
      .catch(() => {
        dispatch({
          type: 'TOGGLE_UI_ALERT',
          payload: {
            open: true,
            message: 'Something went wrong. Could not get content.',
            severity: 'error',
          },
        });
      });
  }, [filename, dispatch]);

  return (
    <div>{html && <div dangerouslySetInnerHTML={{ __html: html }} />}</div>
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
