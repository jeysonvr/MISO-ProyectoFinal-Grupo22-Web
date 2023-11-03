import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

jest.mock('next-intl', () => ({
    useTranslations: () => (key: any) => key,
  }));

describe('Home Page', () => {

    it('should render correctly', () => {
        render(<Home />);
        expect(screen.getByText('cta_login')).toBeInTheDocument();
        expect(screen.getByText('span_or')).toBeInTheDocument();
        expect(screen.getByText('cta_signup')).toBeInTheDocument();
    });    

})