import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import * as message from '../../../../messages/es.json'

import Footer from './Footer';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return 'pathname';
  },
  useParams() {
    return {
      locale: 'en'
    };
  }
}));

describe('Footer component', () => {
  const renderWithProvider = () => (
    <NextIntlClientProvider
      locale={'es'}
      messages={message}
    >
      <Footer />
    </NextIntlClientProvider >);

  it('should render the logo', () => {
    const { getByAltText } = render(renderWithProvider());

    screen.debug()
    const logo = getByAltText('Logo');
    expect(logo).toBeDefined();
  });

  it('should render social network icons', () => {
    const { getByAltText } = render(renderWithProvider());
    const twitterIcon = getByAltText('twitter');
    const facebookIcon = getByAltText('facebook');
    const linkedinIcon = getByAltText('linkedin');
    const youtubeIcon = getByAltText('youtube');

    expect(twitterIcon).toBeDefined();
    expect(facebookIcon).toBeDefined();
    expect(linkedinIcon).toBeDefined();
    expect(youtubeIcon).toBeDefined();
  });

  it('should render the product links', () => {
    const { getByText } = render(renderWithProvider());
    const allJobsLink = getByText('footer.all_jobs');
    const companiesLink = getByText('footer.companies');
    const candidatesLink = getByText('footer.candidates');

    screen.debug();
    expect(allJobsLink).toBeDefined();
    expect(companiesLink).toBeDefined();
    expect(candidatesLink).toBeDefined();
  });

  it('should render the company links', () => {
    const { getByText } = render(renderWithProvider());
    const aboutLink = getByText('footer.about');
    const joinUsLink = getByText('footer.join_us');
    const learnMoreLink = getByText('footer.learn_more');
    expect(aboutLink).toBeDefined();
    expect(joinUsLink).toBeDefined();
    expect(learnMoreLink).toBeDefined();
  });
});
