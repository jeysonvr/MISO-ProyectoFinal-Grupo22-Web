import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { labelsLogin } from '../../mocks/labels';
import LoginForm from './LoginForm';

describe('Login Form Container', () => {

    it('should render correctly', () => {
        render(<LoginForm labels={labelsLogin} />);
        const label_create_account = screen.getByText('Crear cuenta');
        expect (label_create_account).toBeDefined();
    });

    it('should render background image', () => {
        render(<LoginForm labels={labelsLogin} />);
        const imagen = screen.getByAltText('Background Image');
        expect(imagen).toBeDefined();
    })

})