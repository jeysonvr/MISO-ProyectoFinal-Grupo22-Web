import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TechTest from './TechTest';

describe('TechTestGrid Component', () => {

    it('renders loading message when interviewsUser is empty', () => {
        const mockFetch = jest.fn(() => Promise.resolve({
            status: 201,
            json: () => Promise.resolve({ success: true })
          }));
        global.fetch = mockFetch as any; 
        const labels = {
        label_loading: 'Loading...',
        label_not_interviews: 'No test available',
        };        
        const { container } = render(<TechTest labels={labels} />);
        const title = container.querySelector('.my-5')
        expect(title).toBeDefined();
        
    });
    it('renders error message when interviewsUser is empty', () => {
        const mockFetch = jest.fn(() => Promise.resolve({
            status: 409,
            json: () => Promise.resolve({ success: true })
          }));
        global.fetch = mockFetch as any;
        const labels = {
        label_loading: 'Loading...',
        cta_finished_test: 'No test available',
        };        
        const { container } = render(<TechTest labels={labels} />);
        const p = container.querySelector('endTest');
        expect(p).toBeDefined();
        
    });
});
