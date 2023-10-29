import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { labelsHome } from '../../mocks/labels';
import InitForm from './InitForm';

describe('Init Form Container', () => {

    it('should render correctly', () => {
        render(<InitForm labels={labelsHome} />);
        const label_for_you = screen.getByText('Para Ti');
        expect (label_for_you).toBeDefined();       
    });


    

})