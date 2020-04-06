import React, { FC } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { prettyPrint } from 'utils';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    overflow: 'auto',
    padding: theme.spacing(2),
    width: 200,
  },
  cardSubText: {
    flex: 1,
  },
}));

type NotifierCard = {
  text: string;
  number: number;
};

export const NotifierCard: FC<NotifierCard> = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Title>{props.text}</Title>
      <Typography component="p" variant="h4">
        {prettyPrint(props.number)}
      </Typography>
      <Typography color="textSecondary" className={classes.cardSubText}>
        date/time here? and/or src link? or just in About?
      </Typography>
    </Paper>
  );
};
