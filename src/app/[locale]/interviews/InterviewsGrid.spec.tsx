import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import InterviewGrid from './InterviewsGrid';

describe('InterviewGrid Component', () => {

    beforeEach(() => {
        const mockFetch = jest.fn(() => Promise.resolve({
            status: 201,
            json: () => Promise.resolve({ success: true })
          }));
        global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock
    })
    it('renders loading message when interviewsUser is empty', () => {
        const labels = {
        label_loading: 'Loading...',
        label_not_interviews: 'No interviews available',
        };        
        const { container } = render(<InterviewGrid labels={labels} />);
        const title = container.querySelector('.title')
        expect(title).toBeDefined();
        
    });

    it('renders interview list when interviewsUser is not empty', async () => {
        const labels = {
        label_loading: 'Loading...',
        label_not_interviews: 'No interviews available',
        label_subject: 'Subject',
        label_date: 'Date',
        label_hour_start: 'Start Time',
        label_hour_end: 'End Time',
        };

        const interviewsUser = [
        {
            asunto: 'Interview 1',
            fecha: '2023-11-05',
            hora_inicio: '09:00 AM',
            hora_fin: '10:00 AM',
        },
        {
            asunto: 'Interview 2',
            fecha: '2023-11-06',
            hora_inicio: '10:00 AM',
            hora_fin: '11:00 AM',
        },
        ];        
        const { container } = render(<InterviewGrid labels={labels} interviewsUser={interviewsUser} />);
        const title = container.querySelector('.test-list')

        expect(title).toBeDefined();
        
    });
});
