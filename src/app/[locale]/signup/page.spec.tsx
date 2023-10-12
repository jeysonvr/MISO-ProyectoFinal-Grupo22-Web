import React from 'react';
import { render } from '@testing-library/react';
import Signup from './page';

describe('Signup page', () => {
  it('should render content', () => {
    const { getByText } = render(<Signup />);
    const signUpMessage = getByText('Sign up here');
    expect(signUpMessage).toBeDefined();
  });
});
