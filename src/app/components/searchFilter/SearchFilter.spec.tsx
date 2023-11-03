import React from 'react';
import { render, screen } from '@testing-library/react';

import { metadataFilter } from '../../mocks/filters';

import SearchFilter from './SearchFilter';

describe('Search filter component', () => {
  it('should render correctly with metadata', () => {
    render(<SearchFilter
      metadata={metadataFilter}
      onFilterChange={jest.fn()} />);

    const filterLabel = screen.getByText('labelFilter1');

    expect(filterLabel).toBeDefined();
  });

  it('should render correctly with no metadata', () => {
    render(<SearchFilter
      metadata={[]}
      onFilterChange={jest.fn()} />);

    const filterLabel = screen.queryByText('labelFilter1');

    expect(filterLabel).toBeNull();
  });
});
