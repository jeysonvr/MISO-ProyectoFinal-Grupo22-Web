import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Search from './Search';

import { labelSearchCandidate } from '../../mocks/labels';
import { candidateMetadata } from '../../mocks/metadata';

describe('Search Container', () => {
  global.fetch = jest.fn(async () =>
    Promise.resolve({ json: async () => Promise.resolve(candidateMetadata) })
  ) as jest.Mock;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  it('should render correctly', async () => {
    render(<Search labels={labelSearchCandidate} />);

    const labelResults = screen.queryByText(/resultados/);
    await waitFor(() => { expect(labelResults).toBeDefined() });
  });
});
