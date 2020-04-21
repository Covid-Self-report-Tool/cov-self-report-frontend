import React, { FC, useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';

import { getHtmlFromS3 } from 'utils/api';

interface AboutType {
  filename: string;
}

export const AboutSection: FC<AboutType> = ({ filename }) => {
  const [html, setHtml] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getHtmlFromS3(filename)
      .then(response => {
        setHtml(response.text);
      })
      .catch(err => {
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
