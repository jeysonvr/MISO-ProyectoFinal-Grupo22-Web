import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import AcademicInfo from './AcademicInfo';

import { labelsProfileInfo } from '../../../mocks/labels'

describe('Academic Info Container', () => {
  it('should render copies correctly', () => {
    render(<AcademicInfo labels={labelsProfileInfo} />);
    const academicInfoTitle = screen.getByText('Información académica');
    const titleLabel = screen.queryAllByText('Título');
    const titlePlaceHolder = screen.queryAllByText('Título');

    expect(academicInfoTitle).toBeDefined();
    expect(titleLabel).toBeDefined();
    expect(titlePlaceHolder).toBeDefined();
  });

  it('should add/remove academic registers', () => {
    render(<AcademicInfo labels={labelsProfileInfo} />);
    let titleLabel = screen.queryAllByText('Título');
    let titlePlaceHolder = screen.queryAllByText('Título');

    expect(titleLabel).toHaveLength(1);
    expect(titlePlaceHolder).toHaveLength(1);

    // Add register
    const addRegisterButton = screen.getByText('Agregar');
    fireEvent.click(addRegisterButton);

    titleLabel = screen.queryAllByText('Título');
    titlePlaceHolder = screen.queryAllByText('Título');
    expect(titleLabel).toHaveLength(2);
    expect(titlePlaceHolder).toHaveLength(2);

    // Remove register
    const removeRegisterButton = screen.getByText('Remover');
    fireEvent.click(removeRegisterButton);

    titleLabel = screen.queryAllByText('Título');
    titlePlaceHolder = screen.queryAllByText('Título');
    expect(titleLabel).toHaveLength(1);
    expect(titlePlaceHolder).toHaveLength(1);
  });

  it('should not remove academic register if only one', () => {
    render(<AcademicInfo labels={labelsProfileInfo} />);
    let titleLabel = screen.queryAllByText('Título');
    let titlePlaceHolder = screen.queryAllByText('Título');

    expect(titleLabel).toHaveLength(1);
    expect(titlePlaceHolder).toHaveLength(1);

    // Remove register
    const removeRegisterButton = screen.getByText('Remover');
    fireEvent.click(removeRegisterButton);

    titleLabel = screen.queryAllByText('Título');
    titlePlaceHolder = screen.queryAllByText('Título');
    expect(titleLabel).toHaveLength(1);
    expect(titlePlaceHolder).toHaveLength(1);
  });
});
