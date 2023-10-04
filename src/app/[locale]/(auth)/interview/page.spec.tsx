import React from 'react';
import { render } from '@testing-library/react';
import Interviews from './page';

describe('Interviews page', () => {
  it('should render content', () => {
    const { getByText } = render(<Interviews />);
    const signUpMessage = getByText('Interviews here');
    expect(signUpMessage).toBeDefined();
  });
});
