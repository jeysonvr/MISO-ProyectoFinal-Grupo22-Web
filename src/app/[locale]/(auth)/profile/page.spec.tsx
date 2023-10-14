import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

import * as message from '../../../../../messages/es.json'

import { render } from '@testing-library/react';
import Profile from './page';

describe('Profile page', () => {
  const renderWithProvider = () => (
    <NextIntlClientProvider
      locale={'es'}
      messages={message}
    >
      <Profile />
    </NextIntlClientProvider >);
  it('should render content', () => {
    const { getByText } = render(renderWithProvider());
    const labelProfileTitle = getByText('Editar perfil');
    expect(labelProfileTitle).toBeDefined();
  });
});
