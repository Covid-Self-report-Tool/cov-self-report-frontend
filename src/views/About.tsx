import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { TermsAndCond } from 'components';

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

// Convenient to isolate this in order to simplify updates from source copy
// TODO: move into component instead of view
const AboutCopy: FC = () => (
  <>
    <h1 id="about">About</h1>
    <p>
      As scientists we understand that data are critical for developing a true
      and realistic understanding of COVID-19. Moved by the grave pandemic
      facing all of us, we felt it was our duty as individuals with advanced
      training in the sciences to come together and create a tool that fills the
      gaps in our knowledge for COVID-19.
    </p>
    <p>
      One of the major problems facing our global community at this time is the
      lack of testing. Presently, most countries only offer testing to
      individuals in critical condition or those who are hospitalized. Because
      of this, many individuals aren&#39;t being tested for COVID-19 and
      official global data on the number of people infected with the virus, and
      the viral spread is inaccurate and misleading.
    </p>
    <p>
      Motivated by this problem we have come together to combine our skills and
      create a tool that will create more transparency on the spread of COVID-19
      and provide the data we need to overcome this pandemic as a global
      community.
    </p>
    <p>
      View data API (coming soon) | Privacy Policy |{' '}
      <a href="#terms-and-cond">Terms and Conditions</a>
    </p>
    <h2 id="our-story">Our Story</h2>
    <p>
      In early March, one of us began feeling unusual symptoms which sounded
      somewhat like those described for COVID-19. She was denied a test on 5
      occasions. This was frustrating, and being a physicist she realized that
      global data available on the contagion&#39;s true spread was limited by
      testing and thus not accurate. How could we stop a virus we didn&#39;t
      understand? While she struggled to get a test, she reached out to a few
      friends, physicists and computer scientists, about the issue. Soon we came
      together as a team and the idea for this open source, open data,
      crowdsourced tool was born. All of us have full time jobs and have been
      volunteering on evenings and weekends to build this open source platform
      for global good.
    </p>
    <p>
      Interested in contributing your time or resources?{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfkQJMihQUlA6scYvjr1A1OZiXGRRxQLkD1YIiklGDq5YTclQ/viewform?usp=sf_link"
      >
        Join us.
      </a>
    </p>
    <h2 id="data-resources">Data Resources</h2>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CSSEGISandData/COVID-19"
        >
          2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns
          Hopkins CSSE
        </a>
      </li>
    </ul>
    <h2 id="team-information">Team Information</h2>
    <ul>
      <li>
        <strong>Erwin Felicilda</strong> is an actor and entrepreneur whose
        passion and expertise range from the film industry, mobile game D&amp;D
        to the food and beverage industry. He helped lead the marketing
        initiatives at Partender, and has been mentor, organizer and global
        ambassador at StartUp Weekend, 3Day Startups and Global Entrepreneurship
        Congress. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/erwinfelicilda/"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <strong>Gabriel Abud</strong> is a software engineer at Tempo
        Automation, a circuit board assembly company based in San Francisco. His
        background is in biology and bioinformatics and previously he worked in
        agricultural biotech, helping to develop sustainable fertilizer for
        farmers. He currently lives in Oakland, California. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/gabriel-abud/"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <strong>Guneeta Singh Bhalla, PhD</strong> has a PhD in physics from the
        University of Florida and completed her post doctoral research at the
        University of California at Berkeley and the Lawrence Berkeley National
        Laboratory in the field of Condensed Matter Physics. Guneeta founded the
        crowdsourced{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.1947PartitionArchive.org"
        >
          1947 Partition Archive
        </a>{' '}
        in 2011. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/guneeta/"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <strong>Jason Lampel</strong> is a web developer with a background in
        GIS. He owns{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.abettermap.com"
        >
          A Better Map
        </a>{' '}
        and currently lives in Fort Collins, Colorado. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/jason-lampel-607b1732/"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <strong>Nathan Heston, PhD</strong> has a PhD in physics from the
        University of Florida, volunteered for the Peace Corps for two years in
        Ghana and currently teaches physics at California Polytechnic State
        University while doing research in mathematical modeling of solid state
        materials. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/nathan-heston-5488b81b/"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <strong>Nik Wolfe</strong> is a machine learning software engineer at
        Google, and previously worked on a data tracking project during the
        Ebola outbreak as a masters student at Carnegie Mellon University. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/nikolas-wolfe-63b5798/"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <strong>Sumit Arora</strong> heads the Civic Tech Initiatives at
        Janaagraha Centre for Citizenship and Democracy in Bangalore. He
        launched and implemented the Swachh Bharat Mission&#39;s official
        Citizen engagement platform for the Government of India and generally
        works on platforms to enable government and citizen interaction easy and
        data driven. |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/sumitarorain/"
        >
          LinkedIn
        </a>
      </li>
    </ul>
    <h2 id="our-partners">Our Partners</h2>
    <p>
      <strong>Polsinelli Law Firm</strong> This project is supported through the
      efforts of{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.polsinelli.com/professionals/eharding"
      >
        Liz Harding
      </a>
      ,{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.polsinelli.com/professionals/ngambhir"
      >
        Nitin Gambhir
      </a>{' '}
      and{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.polsinelli.com/professionals/psternberg"
      >
        Pasha Sternberg
      </a>{' '}
      of the{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.polsinelli.com"
      >
        Polsinelli Law Firm
      </a>
      .
    </p>
    <h2 id="feedback">Feedback</h2>
    <p>
      Please contact us by filling out{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfkQJMihQUlA6scYvjr1A1OZiXGRRxQLkD1YIiklGDq5YTclQ/viewform?usp=sf_link"
      >
        this short form
      </a>
      .
    </p>
  </>
);

export const About: FC = () => {
  const classes = useStyles();

  return (
    <Container className={`simpler-font ${classes.root}`}>
      <AboutCopy />
      <h2 id="terms-and-cond">Terms and Conditions</h2>
      <TermsAndCond />
    </Container>
  );
};
