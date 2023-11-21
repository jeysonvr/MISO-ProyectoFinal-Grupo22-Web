import React from 'react';
import { render, screen } from '@testing-library/react';

import { labelInterview } from '../../mocks/labels';

import InterviewGrid from './InterviewsGrid';

describe('InterviewGrid Component', () => {
    beforeEach(() => {
        const mockFetch = jest.fn(() => Promise.resolve({
            status: 201,
            json: () => Promise.resolve(
                {
                    success: true,
                    usuario: {
                        id: 1,
                    }
                })
        }));
        global.fetch = mockFetch as any;
    })

    it('should render correctly for no interviews available', () => {
        render(<InterviewGrid labels={labelInterview} />);
        const labelNoInterview = screen.getByText('No interviews available')

        expect(labelNoInterview).toBeDefined();
    })
});
