import React, { FC } from 'react';

import { AboutSection, AboutContainer, Breadcrumb } from 'components';

export const htmlPages = [
  'table-of-contents.html',
  'intro.html',
  'data-resources.html',
  'team-information.html',
  'our-partners.html',
  'data-license.html',
  'footer.html',
];
// The main page
export const About: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="< Home" />
    {htmlPages.map(page => (
      <AboutSection filename={page} />
    ))}
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
