import React from 'react';
import { render } from '@testing-library/react';
import Employees from './page';

describe('Employees page', () => {
  it('should render content', () => {
    const { getByText } = render(<Employees />);
    const signUpMessage = getByText('Employees here');
    expect(signUpMessage).toBeDefined();
  });
});
