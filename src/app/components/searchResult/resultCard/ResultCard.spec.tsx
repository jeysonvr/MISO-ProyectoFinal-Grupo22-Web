import React from 'react';
import { render, screen } from '@testing-library/react';

import ResultCard from './ResultCard';

describe('Result card component', () => {
  it('should render correctly for select type', () => {
    render(<ResultCard name={'name'} desc={''} />);
    const resultName = screen.getByText('name');

    expect(resultName).toBeDefined();
  });
});
