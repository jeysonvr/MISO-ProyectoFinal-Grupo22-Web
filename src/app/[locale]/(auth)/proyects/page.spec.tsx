import React from 'react';
import { render } from '@testing-library/react';
import Proyects from './page';

describe('Proyects page', () => {
  it('should render content', () => {
    const { getByText } = render(<Proyects />);
    const signUpMessage = getByText('Proyects here');
    expect(signUpMessage).toBeDefined();
  });
});
