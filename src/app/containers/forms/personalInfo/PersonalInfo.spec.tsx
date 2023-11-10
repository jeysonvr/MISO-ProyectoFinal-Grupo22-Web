import React from 'react';
import { render, screen } from '@testing-library/react';

import PersonalInfo from './PersonalInfo';

import { labelsProfileInfo } from '../../../mocks/labels'
import { candidateMetadata } from '../../../mocks/metadata';

jest.mock("next/navigation", () => ({
  useParams() {
    return {
      locale: 'en'
    };
  }
}));

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

  it('should render with metadata', () => {
    render(<PersonalInfo
      labels={labelsProfileInfo}
      metadata={candidateMetadata}
    />);

    const languagesTypeLabel = screen.getByText('Idiomas');
    const countryLabel = screen.getByText('País');
    const softSkillsLabel = screen.getByText('Habilidades blandas');
    const techSkillsLabel = screen.getByText('Habilidades técnicas');

    expect(languagesTypeLabel).toBeDefined();
    expect(countryLabel).toBeDefined();
    expect(softSkillsLabel).toBeDefined();
    expect(techSkillsLabel).toBeDefined();
  });
});
