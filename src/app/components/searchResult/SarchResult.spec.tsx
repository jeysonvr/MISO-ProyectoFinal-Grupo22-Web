import React from 'react';
import { render, screen } from '@testing-library/react';

import SearchResult from './SearchResult';

jest.mock('./resultCard/ResultCard', () => ({
  __esModule: true,
  default: (): JSX.Element => (
    <p>ResultCardMock</p>
  )
}));

const countryMetadataMock = [
  {
    id: 1,
    pais: 'Colombia',
  },
  {
    id: 2,
    pais: 'USA',
  },
];

const resultsMock = [
  {
    usuario: {
      email: '',
      id: 1,
      nombre_completo: 'test 1',
    },
    country: 'Colombia',
    idiomas: [],
    id_pais: 1,
  },
  {
    usuario: {
      email: '',
      id: 2,
      nombre_completo: 'test 2',
    },
    country: 'Colombia',
    idiomas: [],
    id_pais: 2,
  },
];

describe('Search result component', () => {
  it('should render correctly for multiple results', () => {
    render(<SearchResult
      labelResults={'resultados:'}
      countryMetadata={countryMetadataMock}
      results={resultsMock}
      ctaLabel={''}
    />);

    const resultCards = screen.queryAllByText('ResultCardMock');

    expect(resultCards).toHaveLength(2);
  });

  it('should render correctly for one result', () => {
    render(<SearchResult
      labelResults={'resultados:'}
      countryMetadata={countryMetadataMock}
      results={[resultsMock[0]]}
      ctaLabel={''}
    />);

    const resultCards = screen.queryAllByText('ResultCardMock');

    expect(resultCards).toHaveLength(1);
  });

  it('should render correctly for no results', () => {
    render(<SearchResult
      labelResults={'resultados:'}
      countryMetadata={countryMetadataMock}
      results={[]}
      ctaLabel={''}
    />);

    const resultCards = screen.queryAllByText('ResultCardMock');

    expect(resultCards).toHaveLength(0);
  });
});
