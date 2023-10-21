import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ProfileForm from './ProfileForm';

import { labelsProfileInfo } from '../../mocks/labels'

describe('Profile Form Container', () => {
  const originalLocation = window.location;

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

  it('should render company profile if userType is candidate', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ type: 'candidate' }));
    render(<ProfileForm labels={labelsProfileInfo} />);
    const titlePersonalInfo = screen.getByText('Información personal');
    const titleAcademicInfo = screen.getByText('Información académica');
    const titleLaboralInfo = screen.getByText('Información laboral');

    expect(titlePersonalInfo).toBeDefined();
    expect(titleAcademicInfo).toBeDefined();
    expect(titleLaboralInfo).toBeDefined();
  });

  it('should render company profile if userType is company', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ type: 'company' }));
    render(<ProfileForm labels={labelsProfileInfo} />);
    const titleGeneralInfo = screen.getByText('Información general');

    expect(titleGeneralInfo).toBeDefined();
  });
});
