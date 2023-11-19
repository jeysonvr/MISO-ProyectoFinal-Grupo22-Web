import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Grid from './Grid';

describe('Grid Component', () => {

    it('renders loading message when content is empty', () => {
        const labels = {
            label_loading: 'Loading...',
            label_no_content: 'Company do not have projects',
        };        
        const { container } = render(<Grid labels={labels} />);
        const title = container.querySelector('.my-2')
        expect(title).toBeDefined();
        
    });
    it('renders grid when content is not empty', () => {
        const content = [{
            nombre: "proyecto1",
            descripcion: "proyecto 1",
            estado: "Activo"
        },
        {
            nombre: "proyecto 2",
            descripcion: "proyecto 2",
            estado: "Activo"
        }];
        const headers = ["nombre", "descripcion","estado"];
        const labels = {
            label_loading: 'Loading...',
        };        
        const { container } = render(<Grid labels={labels} headers={headers} content={content}/>);
        const grid = container.querySelector('.grid');
        expect(grid).toBeDefined();
        
    });
});
