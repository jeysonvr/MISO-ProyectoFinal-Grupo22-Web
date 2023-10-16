import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import PillEditor, { IPillEditor } from './PillEditor';

describe('Pill Editor Component', () => {
  const renderPillEditor = (replaceProps?: Partial<IPillEditor>) => {
    const props: IPillEditor = {
      title: 'Lenguajes',
      placeHolder: 'Agrega un lenguaje',
      ctaLabel: 'Agregar',
      id: 'languages',
      ...replaceProps,
    }

    return (
      <PillEditor {...props} />
    );
  };

  it('should render correctly', () => {
    render(renderPillEditor());
    const title = screen.getByText('Lenguajes');
    const placeHolderInput = screen.getByPlaceholderText('Agrega un lenguaje');
    const ctaAdd = screen.getByText('+ Agregar');

    expect(title).toBeDefined();
    expect(placeHolderInput).toBeDefined();
    expect(ctaAdd).toBeDefined();
  });

  it('should add/remove pills', () => {
    render(renderPillEditor());
    const placeHolderInput = screen.getByPlaceholderText('Agrega un lenguaje');
    const ctaAdd = screen.getByText('+ Agregar');

    let pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);

    // Add pill
    fireEvent.input(placeHolderInput, { target: { value: 'English' } });
    fireEvent.click(ctaAdd);

    pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(1);

    // Remove pill
    const removeButton = screen.getByText('x');
    fireEvent.click(removeButton);

    pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);
  });

  it('should not add a pill if no value', () => {
    render(renderPillEditor());
    const ctaAdd = screen.getByText('+ Agregar');

    let pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);

    // Add pill
    fireEvent.click(ctaAdd);

    pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);
  });

  it('should not add a pill is value already exists', () => {
    render(renderPillEditor());
    const placeHolderInput = screen.getByPlaceholderText('Agrega un lenguaje');
    const ctaAdd = screen.getByText('+ Agregar');

    let pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);

    // Add pill
    fireEvent.input(placeHolderInput, { target: { value: 'English' } });
    fireEvent.click(ctaAdd);

    // Add pill
    fireEvent.input(placeHolderInput, { target: { value: 'English' } });
    fireEvent.click(ctaAdd);

    pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(1);
  });
});
