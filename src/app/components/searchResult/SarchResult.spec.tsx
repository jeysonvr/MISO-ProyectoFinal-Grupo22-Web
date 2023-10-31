import React from 'react';
import { render, screen } from '@testing-library/react';

import SearchResult from './SearchResult';

jest.mock('./resultCard/ResultCard', () => ({
  __esModule: true,
  default: (): JSX.Element => (
    <p>ResultCardMock</p>
  )
}));

describe('Search result component', () => {
  it('should render correctly for multiple results', () => {
    render(<SearchResult
      labelResults={'resultados:'}
      results={[
        { name: 'result 1', desc: 'desc 1' },
        { name: 'result 2', desc: 'desc 2' },
      ]} />);

    const resultCards = screen.queryAllByText('ResultCardMock');

    expect(resultCards).toHaveLength(2);
  });

  it('should render correctly for one result', () => {
    render(<SearchResult
      labelResults={'resultados:'}
      results={[
        { name: 'result 1', desc: 'desc 1' },
      ]} />);

    const resultCards = screen.queryAllByText('ResultCardMock');

    expect(resultCards).toHaveLength(1);
  });

  it('should render correctly for no results', () => {
    render(<SearchResult
      labelResults={'resultados:'}
      results={[]} />);

    const resultCards = screen.queryAllByText('ResultCardMock');

    expect(resultCards).toHaveLength(0);
  });
});
