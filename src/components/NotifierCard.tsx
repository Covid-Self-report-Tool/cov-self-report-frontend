import React, { FC } from 'react';
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { prettyPrint } from 'utils';

const useStyles = makeStyles({
  root: {
    margin: '20px',
    borderWidth: '5px',
  },
});

type NotifierCard = {
  text: string;
  number: number;
};

export const NotifierCard: FC<NotifierCard> = props => {
  const styles = useStyles();

  return (
    <Card variant="outlined" raised className={styles.root} elevation={5}>
      <Typography variant="h4" align="center">
        {props.text}:
      </Typography>
      <Typography variant="h4" align="center">
        {prettyPrint(props.number)}
      </Typography>
    </Card>
  );
};
