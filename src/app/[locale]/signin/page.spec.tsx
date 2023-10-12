import React from 'react';
import { render } from '@testing-library/react';
import Signin from './page';

describe('Signin page', () => {
  it('should render content', () => {
    const { getByText } = render(<Signin />);
    const signUpMessage = getByText('Sign in here');
    expect(signUpMessage).toBeDefined();
  });
});
