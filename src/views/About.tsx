import React, { FC } from 'react';

import { AboutSection, AboutContainer, Breadcrumb } from 'components';

// The main page
export const About: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="< Home" />
    <AboutSection filename="table-of-contents.html" />
    <AboutSection filename="intro.html" />
    <AboutSection filename="data-resources.html" />
    <AboutSection filename="team-information.html" />
    <AboutSection filename="our-partners.html" />
    <AboutSection filename="data-license.html" />
    <AboutSection filename="footer.html" />
  </AboutContainer>
);

export const TermsOfService: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="Home" />
    <Breadcrumb to="/about" text="About" />
    <AboutSection filename="terms-of-service.html" />
  </AboutContainer>
);

export const PrivacyPolicy: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="Home" />
    <Breadcrumb to="/about" text="About" />
    <AboutSection filename="privacy-policy.html" />
  </AboutContainer>
);
