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
    const allJobsLink = getByText('Todos los trabajos');
    const companiesLink = getByText('Empresas');
    const candidatesLink = getByText('Candidatos');

    screen.debug();
    expect(allJobsLink).toBeDefined();
    expect(companiesLink).toBeDefined();
    expect(candidatesLink).toBeDefined();
  });

  it('should render the company links', () => {
    const { getByText } = render(renderWithProvider());
    const aboutLink = getByText('Acerca de');
    const joinUsLink = getByText('Únete a nosotros');
    const learnMoreLink = getByText('Más información');
    expect(aboutLink).toBeDefined();
    expect(joinUsLink).toBeDefined();
    expect(learnMoreLink).toBeDefined();
  });
});
