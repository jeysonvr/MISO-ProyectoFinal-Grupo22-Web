import React from 'react';
import { render } from '@testing-library/react';
import Agreement from './page';

describe('Agreement page', () => {
  it('should render content', () => {
    const { getByText } = render(<Agreement />);
    const signUpMessage = getByText('Agreement here');
    expect(signUpMessage).toBeDefined();
  });
});
