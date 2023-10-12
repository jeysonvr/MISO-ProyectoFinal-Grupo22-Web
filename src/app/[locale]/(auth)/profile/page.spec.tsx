import React from 'react';
import { render } from '@testing-library/react';
import Profile from './page';

describe('Profile page', () => {
  it('should render content', () => {
    const { getByText } = render(<Profile />);
    const signUpMessage = getByText('Profile here');
    expect(signUpMessage).toBeDefined();
  });
});
