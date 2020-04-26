import React, { FC } from 'react';

import { AboutSection, AboutContainer, Breadcrumb } from 'components';

const mainAboutPages = [
  'table-of-contents.html',
  'intro.html',
  'data-resources.html',
  'team-information.html',
  'our-partners.html',
  'data-license.html',
  'footer.html',
];
const termsOfServicePage = 'terms-of-service.html';
const privacyPolicyPage = 'privacy-policy.html';

export const htmlPages = [
  ...mainAboutPages,
  termsOfServicePage,
  privacyPolicyPage,
];

// The main page
export const About: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="< Home" />
    {mainAboutPages.map(page => (
      <AboutSection filename={page} />
    ))}
  </AboutContainer>
);

export const TermsOfService: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="Home" />
    <Breadcrumb to="/about" text="About" />
    <AboutSection filename={termsOfServicePage} />
  </AboutContainer>
);

export const PrivacyPolicy: FC = () => (
  <AboutContainer>
    <Breadcrumb to="/" text="Home" />
    <Breadcrumb to="/about" text="About" />
    <AboutSection filename={privacyPolicyPage} />
  </AboutContainer>
);
