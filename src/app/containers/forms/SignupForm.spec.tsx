import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    })

})