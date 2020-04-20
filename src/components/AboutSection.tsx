import React, { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { getAboutPage } from 'utils/api';

interface AboutType {
  filename: string;
}

export const AboutSection: FC<AboutType> = ({ filename }) => {
  const [html, setHtml] = useState<string>('');

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
