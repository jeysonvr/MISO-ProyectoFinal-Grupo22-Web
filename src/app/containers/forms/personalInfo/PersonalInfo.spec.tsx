import React from 'react';
import { render, screen } from '@testing-library/react';

import PersonalInfo from './PersonalInfo';

import { labelsProfileInfo } from '../../../mocks/labels'

describe('Personal Info Container', () => {
  it('should render copies correctly', () => {
    render(<PersonalInfo labels={labelsProfileInfo} />);
    const personalInfoTitle = screen.getByText('Información personal');
    const nameLabel = screen.getByText('Nombre');
    const namePlaceHolder = screen.getByPlaceholderText('Nombre');

    expect(personalInfoTitle).toBeDefined();
    expect(nameLabel).toBeDefined();
    expect(namePlaceHolder).toBeDefined();
  });
});
