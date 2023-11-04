import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { labelTechTest } from '../../../../mocks/labels' 
import TestGrid from './TestGrid';

describe('Signup Form Container', () => {
  const original = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  })

  afterEach(() => {
    console.error = original
  })

  it('should render correctly', () => {
    const mockFetch = jest.fn(() => Promise.resolve({
        status: 201,
        json: () => Promise.resolve({ success: true })
      }));
    global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock
    render(<TestGrid labels={labelTechTest} />);
    const label_name_test = screen.getByText('Not test pending for the candidate');

    expect(label_name_test).toBeDefined();
  });
});
