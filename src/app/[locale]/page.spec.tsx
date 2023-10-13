import React from 'react';
import { render } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('should render content', () => {
    const { getByText } = render(<Home />);
    const signUpMessage = getByText('Hello word');
    expect(signUpMessage).toBeDefined();
  });
});
