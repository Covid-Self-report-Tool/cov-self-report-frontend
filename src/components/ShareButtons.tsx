import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const url = 'https://www.covidselfreport.org/';
const title = 'Have you experienced symptoms of COVID-19?';
const summary =
  'Add your case and get counted for the COVID-19 public data project.';
const imgUrl =
  'https://lh3.googleusercontent.com/zktcQvkd6gRu58UfwKVM1IN0L-PU28WbUtuGxVRKYTi7JHbtfcm0DRDQ93IzcTslmbeLPpNfoHAziQtLsL_niejdfopaVUQi24NgE58V1_vt0Nd1tQuLMkheMyUtxeB-KCSocl674kN8m0FJkPxeKZBZRnYpsDRajLG4TJ14oAijJIO5gM-Xjpp32uyOUH60zUU0hkwqVGosJ7ytJF3rgcRRtFSftS00w-_7ToZOSM7siQ0dF8Jok8w6pE88WyCa1sHPXF3GgOYI5ER9GcRXw_sSUhJiAiNmxi2DoieaL1PGB46ZcT5oc2r6rh-DuCkOgyU42IeclLQMEnjAre6uvt9hq-gFqCM7q6eYRF3hsAx_ombtbQGtWKgL8KY46M5-iAZs_z3HgIBH-e9V8tFuowthY36lhLfG9tHLTDxQyKoD-Z5YlqwNHSU9QK9uGkiZz1QFfbtkAvlG_-uHiTKwxHOgXxp6xsl8-zMppp1ohn24EVa6wQeJtGfsridPaPw82IjgVSjJ6V29pFWMXqjd5pbTsqSus2MuppFA_qLvveYzXcJHjFh3u1DuB0WnOeu-IaDWpirQ3cLpd6LqswvUpewSEuLFIseF1PV6baftlyWaqbTQ0VzJOIupUEwqrD0WA8BxzNzwpHIAJe6t7gX5tlUtBkmuMEPhZfgXnnYgzvT0XklTSCoT8shgLE4wtx2EDlJe=w1920-h978-ft';
const sourceAkaAppName = 'COVID-19 Self-reporting Tool';

const ShareButtonConfig = [
  <FacebookShareButton url={url} quote={summary}>
    <FacebookIcon size={32} round />
  </FacebookShareButton>,
  <TwitterShareButton url={url} title={`${title} ${summary}`}>
    <TwitterIcon size={32} round />
  </TwitterShareButton>,
  <WhatsappShareButton url={url} title={title}>
    <WhatsappIcon size={32} round />
  </WhatsappShareButton>,
  <LinkedinShareButton
    url={url}
    title={title}
    summary={summary}
    source={sourceAkaAppName}
  >
    <LinkedinIcon size={32} round />
  </LinkedinShareButton>,
  <PinterestShareButton url={url} title={title} media={imgUrl}>
    <PinterestIcon size={32} round />
  </PinterestShareButton>,
  <RedditShareButton url={url} title={title}>
    <RedditIcon size={32} round />
  </RedditShareButton>,
  <EmailShareButton url={url} subject={title} body={summary}>
    <EmailIcon size={32} round />
  </EmailShareButton>,
];

export const ShareButtons: FC = () => {
  return (
    <Grid container spacing={1} justify="center" wrap="nowrap">
      {ShareButtonConfig.map((item, i) => (
        <Grid key={i} item>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};
