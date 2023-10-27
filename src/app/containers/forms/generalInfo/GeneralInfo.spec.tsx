import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import GeneralInfo from './GeneralInfo';

import { labelsProfileInfo } from '../../../mocks/labels'

describe('General Info Container', () => {
  it('should render copies correctly', () => {
    render(<GeneralInfo labels={labelsProfileInfo} />);
    const generalInfoTitle = screen.getByText('Información general');
    const nameLabel = screen.queryAllByText('Nombre');
    const namePlaceHolder = screen.queryAllByText('Nombre');

    expect(generalInfoTitle).toBeDefined();
    expect(nameLabel).toBeDefined();
    expect(namePlaceHolder).toBeDefined();
  });
});
