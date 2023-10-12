import React from 'react';
import { render } from '@testing-library/react';
import Performance from './page';

describe('Performance page', () => {
  it('should render content', () => {
    const { getByText } = render(<Performance />);
    const signUpMessage = getByText('Performance here');
    expect(signUpMessage).toBeDefined();
  });
});
