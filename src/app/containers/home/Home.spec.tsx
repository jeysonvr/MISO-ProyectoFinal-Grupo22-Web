import React from 'react';
import { render, screen } from '@testing-library/react';

import { labelHome } from '../../mocks/labels';
import * as appProvider from '../../providers/AppProvider';

import { HomeContainer } from './Home';

describe('Footer component', () => {
  it('should render correctly for identified user', async () => {
    jest.spyOn(appProvider, 'useAppContext').mockImplementation(() => ({
      user: {
        email: 'test@test.com',
        type: 'candidate',
        language: 'es',
      }
    }))

    render(<HomeContainer labels={labelHome} />);

    const titleLabel = screen.getByRole("heading", { level: 1, name: 'Construye tu futuro iniciando hoy mismo' });
    expect(titleLabel).toBeDefined();
  });

  it('should render correctly for anonymous user', async () => {
    jest.spyOn(appProvider, 'useAppContext').mockImplementation(() => ({
      user: {
        email: '',
        type: 'anonymous',
        language: 'es',
      }
    }))

    render(<HomeContainer labels={labelHome} />);

    const ctaLogin = screen.queryByRole('button', { name: 'Iniciar sesión' });
    const ctaSignup = screen.queryByRole('button', { name: 'Registrarme' });

    expect(ctaLogin).toBeDefined();
    expect(ctaSignup).toBeDefined();
  });

  it('should be empty if user email is undefined', async () => {
    jest.spyOn(appProvider, 'useAppContext').mockImplementation(() => ({
      user: {
        email: undefined,
        type: 'anonymous',
        language: 'es',
      }
    }))

    render(<HomeContainer labels={labelHome} />);

    const titleLabel = screen.queryByRole("heading", { level: 1, name: 'Construye tu futuro iniciando hoy mismo' });
    expect(titleLabel).toBeNull();

    const ctaLogin = screen.queryByRole('button', { name: 'Iniciar sesión' });
    const ctaSignup = screen.queryByRole('button', { name: 'Registrarme' });
    expect(ctaLogin).toBeNull();
    expect(ctaSignup).toBeNull();
  });
});
