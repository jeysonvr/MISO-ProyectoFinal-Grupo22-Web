import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import TechTest from './page';
import { render, screen, waitFor } from '@testing-library/react';
import * as message from '../../../../messages/es.json'

describe('TechTest page', () => {
  const renderWithProvider = () => (
    <NextIntlClientProvider
      locale={'es'}
      messages={message}
    >
      <TechTest />
    </NextIntlClientProvider >);
  beforeEach(() => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    global.fetch = mockFetch as any;
  })
  it('should render content', async () => {
    render(renderWithProvider());
    const searchTitle = screen.getByRole('heading', { level: 1, name: 'Prueba Técnica' });
    await waitFor(() => { expect(searchTitle).toBeDefined() });
  });
});
