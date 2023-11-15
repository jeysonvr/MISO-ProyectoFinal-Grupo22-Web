import React from 'react';
import { render, screen } from '@testing-library/react';

import GeneralInfo from './GeneralInfo';

import { labelsProfileInfo } from '../../../mocks/labels';
import { companyMetadata } from '../../../mocks/metadata';

jest.mock("next/navigation", () => ({
  useParams() {
    return {
      locale: 'en'
    };
  }
}));

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

  it('should render with metadata', () => {
    render(<GeneralInfo
      labels={labelsProfileInfo}
      metadata={companyMetadata}
    />);

    const companyTypeLabel = screen.getByText('Tipo de empresa');
    const businessVerticalLabel = screen.getByText('Vertical de negocio');
    const localtionLabel = screen.getByText('Ubicación');

    expect(companyTypeLabel).toBeDefined();
    expect(businessVerticalLabel).toBeDefined();
    expect(localtionLabel).toBeDefined();
  });
});
