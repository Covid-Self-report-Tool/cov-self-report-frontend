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
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const url = 'https://covidselfreport.org/';
const title = 'Covid self-report true data tracker';
const summary = 'Covid self-report true data tracker';
const imgUrl =
  'https://lh3.googleusercontent.com/qZJnCD8tqmt5_MOJNVZ7NIDyUYfT1dcSWYhVUdk4TSH08uyA0KrhUrArzzc5zjrhDaTIVxifnXLhn3aiYoN7JqsNZYmE7wb6eFab4-gQmI2XfwxS0Pof6-WbVuie=w1274';

const ShareButtonConfig = [
  <FacebookShareButton url={url} quote={title}>
    <FacebookIcon size={32} round />
  </FacebookShareButton>,
  <TwitterShareButton url={url} title={title}>
    <TwitterIcon size={32} round />
  </TwitterShareButton>,
  <WhatsappShareButton url={url} title={title}>
    <WhatsappIcon size={32} round />
  </WhatsappShareButton>,
  <LinkedinShareButton url={url} title={title}>
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

export const ShareButtons: FC = props => {
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
