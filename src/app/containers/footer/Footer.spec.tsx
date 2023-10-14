import React from 'react';
import { render } from '@testing-library/react';
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

    const logo = getByAltText('ABC Jobs Logo');
    expect(logo).toBeDefined();
  });

  it('should render copies correctly', () => {
    const { getByText } = render(renderWithProvider());
    const aboutLabel = getByText('Acerca de');
    const PrivacyPolicyLabel = getByText('Política de privacidad');
    const contactLabel = getByText('Contacto');
    const copyRightLabel = getByText(/Todos los derechos reservados./);

    expect(aboutLabel).toBeDefined();
    expect(PrivacyPolicyLabel).toBeDefined();
    expect(contactLabel).toBeDefined();
    expect(copyRightLabel).toBeDefined();
  });
});
