import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import PillEditor, { IPillEditor } from './PillEditor';
import { multiSelectorMock } from '../../mocks/selector';

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

  it('should render correctly for select type', () => {
    render(renderPillEditor());
    const title = screen.getByText('Lenguajes');
    const ctaAdd = screen.getByText('+ Agregar');
    const select = screen.getByRole('combobox');

    expect(title).toBeDefined();
    expect(select).toBeDefined();
    expect(ctaAdd).toBeDefined();
  });

  it('should render multiselector', () => {
    render(renderPillEditor({
      elements: multiSelectorMock,
      isMultiSelector: true,
    }));
    const title = screen.getByText('Lenguajes');
    const ctaAdd = screen.getByText('+ Agregar');
    const select = screen.getAllByRole('combobox');

    expect(title).toBeDefined();
    expect(select).toHaveLength(2);
    expect(ctaAdd).toBeDefined();
  });

  it('should update value for selector type', () => {
    render(renderPillEditor({
      elements: multiSelectorMock,
    }));
    const title = screen.getByText('Lenguajes');
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    expect(title).toBeDefined();
    expect(select.value).toBe('1');

    fireEvent.change(select[0], { target: { value: '2' } })
    expect(select.value).toBe('2');
  });

  it('should update secondary selector when first selector changes its value', () => {
    render(renderPillEditor({
      elements: multiSelectorMock,
      isMultiSelector: true,
    }));
    const title = screen.getByText('Lenguajes');
    const select = screen.getAllByRole('combobox') as HTMLSelectElement[];

    expect(title).toBeDefined();
    expect(select).toHaveLength(2);
    expect(select[1].value).toBe('Bogotá');

    fireEvent.change(select[0], { target: { value: '2' } })

    expect(select[1].value).toBe('New York');
  });

  it('should render correctly for input type', () => {
    render(renderPillEditor({ type: 'input' }));
    const title = screen.getByText('Lenguajes');
    const placeHolderInput = screen.getByPlaceholderText('Agrega un lenguaje');
    const ctaAdd = screen.getByText('+ Agregar');

    expect(title).toBeDefined();
    expect(placeHolderInput).toBeDefined();
    expect(ctaAdd).toBeDefined();
  });

  it('should add/remove pills', () => {
    render(renderPillEditor({ type: 'input' }));
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
    render(renderPillEditor({ type: 'input' }));
    const ctaAdd = screen.getByText('+ Agregar');

    let pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);

    // Add pill
    fireEvent.click(ctaAdd);

    pills = screen.queryAllByText('English');
    expect(pills).toHaveLength(0);
  });

  it('should not add a pill if value already exists', () => {
    render(renderPillEditor({ type: 'input' }));
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
