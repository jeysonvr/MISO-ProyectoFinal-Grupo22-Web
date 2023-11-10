import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ProfileForm from './ProfileForm';

import { labelsProfileInfo } from '../../mocks/labels';
import { candidateMetadata, companyMetadata } from '../../mocks/metadata';

jest.mock("next/navigation", () => ({
  useParams() {
    return {
      locale: 'en'
    };
  }
}));

describe('Profile Form Container', () => {
  const originalLocation = window.location;

  global.fetch = jest.fn(async () =>
    Promise.resolve({ json: async () => Promise.resolve(candidateMetadata) })
  ) as jest.Mock;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
  });

  it('should render correctly', () => {
    render(<ProfileForm labels={labelsProfileInfo} />);
    const ctaCancel = screen.getByText('Cancelar');
    const ctaSave = screen.getByText('Guardar');

    expect(ctaCancel).toBeDefined();
    expect(ctaSave).toBeDefined();
  });

  it('should refresh page on cancel event', () => {
    render(<ProfileForm labels={labelsProfileInfo} />);
    const ctaCancel = screen.getByText('Cancelar');

    fireEvent.click(ctaCancel);

    expect(ctaCancel).toBeDefined();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should render company profile if userType is candidate', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ type: 'candidate' }));
    render(<ProfileForm labels={labelsProfileInfo} />);
    await waitFor(() => {
      const titlePersonalInfo = screen.getByText('Información personal');
      const titleAcademicInfo = screen.getByText('Información académica');
      const titleLaboralInfo = screen.getByText('Información laboral');

      expect(titlePersonalInfo).toBeDefined();
      expect(titleAcademicInfo).toBeDefined();
      expect(titleLaboralInfo).toBeDefined();
    });
  });

  it('should render company profile if userType is company', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({ json: async () => Promise.resolve(companyMetadata) })
    ) as jest.Mock;

    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ type: 'company' }));
    render(<ProfileForm labels={labelsProfileInfo} />);

    await waitFor(() => {
      const titleGeneralInfo = screen.getByText('Información general');

      expect(titleGeneralInfo).toBeDefined();
    });
  });
});
