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
  'https://s3.console.aws.amazon.com/s3/buckets/self-tracker-tool-public/static-web-content/?region=us-east-1&tab=overview';
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
