import React from 'react';
import { render } from '@testing-library/react';
import SearchCandidates from './page';

describe('SearchCandidates page', () => {
  it('should render content', () => {
    const { getByText } = render(<SearchCandidates />);
    const signUpMessage = getByText('Search candidates here');
    expect(signUpMessage).toBeDefined();
  });
});
