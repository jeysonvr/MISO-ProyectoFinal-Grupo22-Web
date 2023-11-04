import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { labelTechTest } from '../../../../mocks/labels' 
import TestItem from './TestItem';

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
    const test ={
        "id": 1,
        "nombre_evaluacion": "Prueba 1",
        "estado": "Pendiente",
        "calificacion": "1"
    };
    render(<TestItem labels={labelTechTest} test={test} />);
    const label_name_test = screen.getByText('Prueba 1');
    expect(label_name_test).toBeDefined();
  });
  it('should render correctly', () => {
    const mockFetch = jest.fn(() => Promise.resolve({
        status: 201,
        json: () => Promise.resolve({ success: true })
      }));
    global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock
    const test ={
        "id": 1,
        "nombre_evaluacion": "Prueba 1",
        "estado": "Vencida",
        "calificacion": "1"
    };
    render(<TestItem labels={labelTechTest} test={test} />);
    const label_name_test = screen.getByText('Prueba 1');
    expect(label_name_test).toBeDefined();
  });
  it('should render correctly', () => {
    const mockFetch = jest.fn(() => Promise.resolve({
        status: 201,
        json: () => Promise.resolve({ success: true })
      }));
    global.fetch = mockFetch as any; // Sobrescribe la función fetch global con un mock
    const test ={
        "id": 1,
        "nombre_evaluacion": "Prueba 1",
        "estado": "Finalizada",
        "calificacion": "1"
    };
    render(<TestItem labels={labelTechTest} test={test} />);
    const label_name_test = screen.getByText('Prueba 1');
    expect(label_name_test).toBeDefined();
  });
});
