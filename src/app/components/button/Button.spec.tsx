import React from 'react';
import { render, screen } from '@testing-library/react';

import Button, { ButtonStyle, IButton } from './Button';

describe('Pill Editor Component', () => {
  const renderButton = (replaceProps?: Partial<IButton>) => {
    const props: IButton = {
      style: ButtonStyle.primary,
      text: 'Agregar',
      ...replaceProps,
    }

    return (
      <Button {...props} />
    );
  };


  it('should not add a pill is value already exists', () => {
    render(renderButton());

    const ctaText = screen.getByText('Agregar');

    expect(ctaText).toBeDefined();
  });
});
