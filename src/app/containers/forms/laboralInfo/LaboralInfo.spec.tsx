import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LaboralInfo from './LaboralInfo';

import { labelsProfileInfo } from '../../../mocks/labels'

describe('Laboral Info Container', () => {
  it('should render copies correctly', () => {
    render(<LaboralInfo labels={labelsProfileInfo} />);
    const laboralInfoTitle = screen.getByText('Información laboral');
    const rolLabel = screen.getByText('Rol desempeñado');

    expect(laboralInfoTitle).toBeDefined();
    expect(rolLabel).toBeDefined();
  });

  it('should add/remove laboral registers', () => {
    render(<LaboralInfo labels={labelsProfileInfo} />);
    let rolLabel = screen.queryAllByText('Rol desempeñado');
    let rolPlaceHolder = screen.queryAllByText('Rol desempeñado');

    expect(rolLabel).toHaveLength(1);
    expect(rolPlaceHolder).toHaveLength(1);

    // Add register
    const addRegisterButton = screen.getByText('Agregar');
    fireEvent.click(addRegisterButton);

    rolLabel = screen.queryAllByText('Rol desempeñado');
    rolPlaceHolder = screen.queryAllByText('Rol desempeñado');
    expect(rolLabel).toHaveLength(2);
    expect(rolPlaceHolder).toHaveLength(2);

    // Remove register
    const removeRegisterButton = screen.getByText('Remover');
    fireEvent.click(removeRegisterButton);

    rolLabel = screen.queryAllByText('Rol desempeñado');
    rolPlaceHolder = screen.queryAllByText('Rol desempeñado');
    expect(rolLabel).toHaveLength(1);
    expect(rolPlaceHolder).toHaveLength(1);
  });

  it('should not remove laboral register if only one', () => {
    render(<LaboralInfo labels={labelsProfileInfo} />);
    let rolLabel = screen.queryAllByText('Rol desempeñado');
    let rolPlaceHolder = screen.queryAllByText('Rol desempeñado');

    expect(rolLabel).toHaveLength(1);
    expect(rolPlaceHolder).toHaveLength(1);

    // Remove register
    const removeRegisterButton = screen.getByText('Remover');
    fireEvent.click(removeRegisterButton);

    rolLabel = screen.queryAllByText('Rol desempeñado');
    rolPlaceHolder = screen.queryAllByText('Rol desempeñado');
    expect(rolLabel).toHaveLength(1);
    expect(rolPlaceHolder).toHaveLength(1);
  });
});
