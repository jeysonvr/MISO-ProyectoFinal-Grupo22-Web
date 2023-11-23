import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

import * as message from '../../../../../messages/es.json'

import { render } from '@testing-library/react';
import PerformanceReview from './page';

jest.mock("next/navigation", () => ({
  useParams() {
    return {
      locale: 'es'
    };
  }
}));

describe('PerformanceReview page', () => {
  const renderWithProvider = () => (
    <NextIntlClientProvider
      locale={'es'}
      messages={message}
    >
      <PerformanceReview />
    </NextIntlClientProvider >);
  it('should render content', () => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    global.fetch = mockFetch as any;
    const { getByText } = render(renderWithProvider());
    const labelPerformanceReviewTitle = getByText('Evaluación de desempeño');
    expect(labelPerformanceReviewTitle).toBeDefined();
  });
});
