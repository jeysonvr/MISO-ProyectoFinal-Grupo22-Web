import React from 'react';
import { render, screen } from '@testing-library/react';

import ResultCard from './ResultCard';

const cardResultMock = {
  usuario: {
    email: 'test@test.com',
    id: 1,
    nombre_completo: 'Test Test',
  },
  country: 'Colombia',
  idiomas: [
    {
      id: 1,
      idioma: 'Español'
    }
  ],
  ctaLabel: 'Connect',
}

describe('Result card component', () => {
  const renderResultCard = (cardResult?: any) => {
    return (
      <ResultCard
        {...cardResult}
      />
    )
  }
  it('should render correctly', () => {
    render(renderResultCard(cardResultMock));

    const iconName = screen.getByText('TT');
    const name = screen.getByText('Test Test');
    const ctaButton = screen.getByRole('button', { name: 'Connect' });

    expect(iconName).toBeDefined();
    expect(name).toBeDefined();
    expect(ctaButton).toBeDefined();
  });

  it('should render correctly with default values', () => {
    render(renderResultCard({
      usuario: {
        ...cardResultMock.usuario,
        nombre_completo: 'Test',
      },
      idiomas: []
    }));

    const iconName = screen.getByText('T');
    const name = screen.getByText('Test');

    expect(iconName).toBeDefined();
    expect(name).toBeDefined();
  });
});
