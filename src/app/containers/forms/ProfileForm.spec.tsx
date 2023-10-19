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
});
