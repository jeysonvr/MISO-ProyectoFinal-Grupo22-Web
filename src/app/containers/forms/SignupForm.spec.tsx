import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { labelsSignup } from '../../mocks/labels';
import SignupForm from './SignupForm';

describe('Signup Form Container', () => {
  const original = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  })

  afterEach(() => {
    console.error = original
  })

  it('should render correctly', () => {
    render(<SignupForm labels={labelsSignup} />);
    const label_login = screen.getByText('Iniciar sesión');
    const label_full_name = screen.getByText('Nombre');
    const label_email = screen.getByText('Correo electrónico');
    const label_password = screen.getByText('Contraseña');
    const label_have_an_account = screen.getByText('¿Tienes una cuenta?');
    expect(label_login).toBeDefined();
    expect(label_full_name).toBeDefined();
    expect(label_email).toBeDefined();
    expect(label_password).toBeDefined();
    expect(label_have_an_account).toBeDefined();
  });

  it('should render background image', () => {
    render(<SignupForm labels={labelsSignup} />);
    const imagen = screen.getByAltText('Background Image');
    expect(imagen).toBeDefined();
  });

  it('should handle full name change correctly', () => {
    render(<SignupForm labels={{}} />);
    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });

    expect(fullNameInput.value).toBe('John Doe');
  });

  it('should change user type', () => {
    const labelCandidato = 'candidato';
    const labelCompany = 'empresa';
    const labelIAm = 'soy';
    render(<SignupForm labels={{
      title_signup: 'Registro',
      label_candidate: labelCandidato,
      label_company: labelCompany,
      label_i_am: labelIAm,
    }} />);
    let labelTitle = screen.getByText('Registro candidato');

    const ctaChangeRol = screen.getByText('soy');
    expect(labelTitle).toBeDefined();

    fireEvent.click(ctaChangeRol);

    labelTitle = screen.getByText('Registro empresa');
    expect(labelTitle).toBeDefined();

    fireEvent.click(ctaChangeRol);

    labelTitle = screen.getByText('Registro candidato');
    expect(labelTitle).toBeDefined();
  });

  it('should handle email change correctly', () => {
    render(<SignupForm labels={{}} />);
    const emailInput = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'John@Doe.com' } });

    expect(emailInput.value).toBe('John@Doe.com');
  });

  it('should handle password change correctly', () => {
    render(<SignupForm labels={{}} />);
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'JohnDoe123' } });

    expect(passwordInput.value).toBe('JohnDoe123');
  });

  it('should handle form submission correctly', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({
      status: 201,
      json: () => Promise.resolve({ success: true })
    }));
    global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock

    render(<SignupForm labels={{}} />);
    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const termsAcceptedCheckbox = document.getElementById('terms') as HTMLInputElement;

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(termsAcceptedCheckbox);

    const submitButton = document.getElementById('signupBtn') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_completo: 'John Doe',
            email: 'test@example.com',
            contrasena: 'password123',
            id_tipo_usuario: 2,
          }),
        })
      );
    });
  });

  it('should handle form submission with fail response', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({
      status: 400,
      json: () => Promise.resolve({ success: true })
    }));
    global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock

    render(<SignupForm labels={{}} />);
    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const termsAcceptedCheckbox = document.getElementById('terms') as HTMLInputElement;

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(termsAcceptedCheckbox);

    const submitButton = document.getElementById('signupBtn') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_completo: 'John Doe',
            email: 'test@example.com',
            contrasena: 'password123',
            id_tipo_usuario: 2,
          }),
        })
      );
    });
  });
});
