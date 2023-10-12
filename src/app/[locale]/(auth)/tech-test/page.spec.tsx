import React from 'react';
import { render } from '@testing-library/react';
import TechTest from './page';

describe('TechTest page', () => {
  it('should render content', () => {
    const { getByText } = render(<TechTest />);
    const signUpMessage = getByText('Tech test here');
    expect(signUpMessage).toBeDefined();
  });
});
