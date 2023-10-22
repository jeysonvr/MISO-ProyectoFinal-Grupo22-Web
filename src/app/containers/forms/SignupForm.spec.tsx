import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { labelsSignup } from '../../mocks/labels';
import SignupForm from './SignupForm';

describe('Signup Form Container', () => {

    it('should render correctly', () => {
        render(<SignupForm labels={labelsSignup} />);
        const label_login = screen.getByText('Iniciar sesión');
        const label_full_name = screen.getByText('Nombre completo:');
        const label_email = screen.getByText('Correo electrónico:');
        const label_password = screen.getByText('Contraseña:');
        const label_have_an_account = screen.getByText('¿Tienes una cuenta?');
        expect (label_login).toBeDefined();
        expect (label_full_name).toBeDefined();
        expect (label_email).toBeDefined();
        expect (label_password).toBeDefined();
        expect (label_have_an_account).toBeDefined();
    });

    it('should render background image', () => {
        render(<SignupForm labels={labelsSignup} />);
        const imagen = screen.getByAltText('Background Image');
        expect(imagen).toBeDefined();
    });

    it('should handle full name change correctly', () => {
        render(<SignupForm labels={{}} />);
        const fullNameInput = document.getElementById('fullName') as HTMLInputElement ;
        
        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    
        expect(fullNameInput.value).toBe('John Doe');
    });

    it('should handle email change correctly', () => {
        render(<SignupForm labels={{}} />);
        const emailInput = document.getElementById('email') as HTMLInputElement ;
        
        fireEvent.change(emailInput, { target: { value: 'John@Doe.com' } });
    
        expect(emailInput.value).toBe('John@Doe.com');
    });

    it('should handle password change correctly', () => {
        render(<SignupForm labels={{}} />);
        const passwordInput = document.getElementById('password') as HTMLInputElement ;
        
        fireEvent.change(passwordInput, { target: { value: 'JohnDoe123' } });
    
        expect(passwordInput.value).toBe('JohnDoe123');
    });

    it('should handle form submission correctly', async () => {
        const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ success: true }) }));
        global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock

        render(<SignupForm labels={{}} />);
        const fullNameInput = document.getElementById('fullName') as HTMLInputElement ;
        const emailInput = document.getElementById('email') as HTMLInputElement ;
        const passwordInput = document.getElementById('password') as HTMLInputElement ;
        const termsAcceptedCheckbox = document.getElementById('terms') as HTMLInputElement ;
    
        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(termsAcceptedCheckbox);
    
        const submitButton = document.getElementById('signupBtn') as HTMLButtonElement ;
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(
            'https://34.117.49.114/registro/usuario',
            expect.objectContaining({
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nombre_completo: 'John Doe',
                email: 'test@example.com',
                contrasena: 'password123',
                id_tipo_usuario: 1,
              }),
            })
          );
        });
    });

    it('should handle form submission with error', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject({
                error: 'Request failed',
            })
        );

        console.error = jest.fn();

        render(<SignupForm labels={{}} />);
        const fullNameInput = document.getElementById('fullName') as HTMLInputElement ;
        const emailInput = document.getElementById('email') as HTMLInputElement ;
        const passwordInput = document.getElementById('password') as HTMLInputElement ;
        const termsAcceptedCheckbox = document.getElementById('terms') as HTMLInputElement ;
    
        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(termsAcceptedCheckbox);
    
        const submitButton = document.getElementById('signupBtn') as HTMLButtonElement ;
        fireEvent.click(submitButton);
    
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Request failed', {
              error: 'Request failed',
            });
        });
    });

});
