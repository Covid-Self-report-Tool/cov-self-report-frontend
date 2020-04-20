import React, { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { getAboutPage } from 'utils/api';

interface AboutType {
  filename: string;
}

export const AboutSection: FC<AboutType> = ({ filename }) => {
  const [html, setHtml] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getAboutPage(filename)
      .then(response => {
        setHtml(response.text);
      })
      .catch(err => {
        setError(true);
        console.error(err);
      });
  }, []);

  return (
    <div>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      {!html && !error && <CircularProgress size={30} />}
      {error && (
        <Alert severity="error" variant="filled">
          Could not get {filename}
        </Alert>
      )}
    </div>
  );
};
