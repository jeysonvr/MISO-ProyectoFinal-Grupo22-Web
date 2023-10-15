import React from 'react';
import { render } from '@testing-library/react';
import Login from './page';

describe('Login page', () => {
  it('should render content', () => {
    const { getByText } = render(<Login />);
    const signUpMessage = getByText('Log in here');
    expect(signUpMessage).toBeDefined();
  });
});
