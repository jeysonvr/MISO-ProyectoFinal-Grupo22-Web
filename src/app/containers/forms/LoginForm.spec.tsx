import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { labelsLogin } from '../../mocks/labels';
import LoginForm from './LoginForm';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Login Form Container', () => {

  it('should render correctly', () => {
    render(<LoginForm labels={labelsLogin} />);
    const label_create_account = screen.getByText('Crear cuenta');
    expect(label_create_account).toBeDefined();
  });

  it('should render background image', () => {
    render(<LoginForm labels={labelsLogin} />);
    const imagen = screen.getByAltText('Background Image');
    expect(imagen).toBeDefined();
  });

  it('should handle email change correctly', () => {
    render(<LoginForm labels={{}} />);
    const emailInput = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'John@Doe.com' } });

    expect(emailInput.value).toBe('John@Doe.com');
  });

  it('should handle password change correctly', () => {
    render(<LoginForm labels={{}} />);
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'JohnDoe123' } });

    expect(passwordInput.value).toBe('JohnDoe123');
  });

  it('should handle form submission correctly', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ success: true }) }));
    global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock

    render(<LoginForm labels={{}} />);
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = document.getElementById('loginBtn') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://34.117.49.114/registro/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            contrasena: 'password123'
          }),
        })
      );
    });
  });

  it('should handle form submission with error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        Error: 'Error:',
      })
    );

    console.error = jest.fn();

    render(<LoginForm labels={{}} />);
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = document.getElementById('loginBtn') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error:', {
        Error: 'Error:',
      });
    });
  });

  it('debería manejar el evento onChange para el input "remember"', () => {
    render(<LoginForm labels={{}} />);
    const rememberInput = document.getElementById('remember') as HTMLInputElement;
    fireEvent.click(rememberInput);
    expect(rememberInput.checked).toBe(true);
  });

})
