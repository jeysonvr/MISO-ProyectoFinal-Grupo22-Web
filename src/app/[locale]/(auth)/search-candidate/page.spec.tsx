import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render, screen, waitFor } from '@testing-library/react';

import * as message from '../../../../../messages/es.json'

import SearchCandidates from './page';

describe('SearchCandidates page', () => {
  const renderWithProvider = () => (
    <NextIntlClientProvider
      locale={'es'}
      messages={message}
    >
      <SearchCandidates />
    </NextIntlClientProvider >);

  beforeEach(() => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    global.fetch = mockFetch as any;
  })
  it('should render content', async () => {
    render(renderWithProvider());
    const searchTitle = screen.getByRole('heading', { level: 1, name: 'Buscar Candidatos' });

    await waitFor(() => { expect(searchTitle).toBeDefined() });
  });
});
