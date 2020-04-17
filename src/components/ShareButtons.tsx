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

const url = 'https://covidselfreport.org/';
const title = 'Covid self-report true data tracker';
const summary = 'Covid self-report true data tracker';
const imgUrl =
  'https://lh3.googleusercontent.com/9BMpKIAhXZXDTQwoHX1Rea6tjdfP-5byc-QYt01zZMGrLtoZ8Ls8zZjcYc3MsQpng95PHC-XhPSWj_InCHppIimFFbWW8WHZMt-GN1xqMT9g5bgZ6imntenh9Rnt7MWKvuZUwwENZ7UyyHlN_eFb9nRZuS2rEjdPyu7M9q944KMK6WluKbIeAYetiGSnH18_zO94ZiKNAVBcqDSqHHSZa8L95205rHTQS89dZQMME4GedXGZcrr4cOstMsn4TAQBSmPbw55mu6kNJ_LwAVGpI8kWRILTyT6elsnHrqQYIgkzeSGW61FSZpkzcvYdXlLFr8EZ3JJb8wP5Br-x84MgayvT5VLs0n0M2nG6OGlfNffpS5TMq0-FRDC-2wxE79ht9HtsWOzwWvikKpZt1OWu6IBnadErnRUA0pzmQrQFqBGVMvYhUwi8cGCc9n3QxHkC8-WeQQ8_up9BMkdtDRZouIZw-EJ8RALIcA98Xn1uGdmyJU__JnkDmAZqezDHAnRNpqdGi3bLKxPK94k2J6Y7reGLTyKz1wlExEtnMpHaCsQcPsKuqSBxIG30rq7GMMfj7rfY1ea4vEPegI90ampJgowqevOIHsxjWFV4SKtNnwBs6_stSM9ukCi69jyjUXD3oDMGl3JLtU-ltim1ee-TM5npbs6wdtNKS8YpXRonnSWtzItf1WAMQSOK3eKc7-aSqngY=w1920-h978-ft';

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
