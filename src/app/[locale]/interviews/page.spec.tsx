import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Interviews from './page';
import { render, screen, waitFor } from '@testing-library/react';
import * as message from '../../../../messages/es.json'

describe('Interviews page', () => {
  const renderWithProvider = () => (
    <NextIntlClientProvider
      locale={'es'}
      messages={message}
    >
      <Interviews />
    </NextIntlClientProvider >);
  beforeEach(() => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    global.fetch = mockFetch as any;
  })
  it('should render content', async () => {
    render(renderWithProvider());
    const searchTitle = screen.getByRole('heading', { level: 1, name: 'Entrevistas Programadas' });
    await waitFor(() => { expect(searchTitle).toBeDefined() });
  });
});
