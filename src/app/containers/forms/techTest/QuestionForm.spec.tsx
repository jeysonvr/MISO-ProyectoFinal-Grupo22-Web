import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import QuestionForm from './QuestionForm'; // Ajusta la ruta de importación según tu estructura de archivos

// Mock para process.env.NEXT_PUBLIC_HOST_URL
const originalEnv = process.env;
process.env.NEXT_PUBLIC_HOST_URL = 'http://example.com';

// Mock de la función fetch
const mockFetch = jest.fn(() => Promise.resolve({
    status: 201,
    json: () => Promise.resolve({ success: true })
  }));
global.fetch = mockFetch as any;

describe('QuestionForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente y maneja clics en el botón', async () => {
    const question = {
      pregunta: '¿Esta es una pregunta?',
      posibles_respuestas: [
        { id_respuesta: 1, respuesta: 'Respuesta 1' },
        { id_respuesta: 2, respuesta: 'Respuesta 2' },
      ]};

    const labels = {
      cta_next: 'Siguiente',
      label_question: 'Pregunta',
      label_of: 'de',
      cta_finished_test: 'Prueba finalizada',
    };

    const { getByText, getByLabelText } = render(
      <QuestionForm
        testId={1}
        question={question}
        currentQuestionIndex={0}
        onNextQuestion={jest.fn()}
        labels={labels}
      />
    );

    expect(getByText('¿Esta es una pregunta?')).toBeDefined();
    expect(getByText('Respuesta 1')).toBeDefined();
    expect(getByText('Respuesta 2')).toBeDefined();
    expect(getByText('Pregunta 1 de 5')).toBeDefined();
    expect(getByText('Siguiente')).toBeDefined();

    // Simula un clic en el botón de siguiente
    fireEvent.click(getByText('Siguiente'));

    // Asegúrate de que la función fetch se haya llamado con la URL correcta
    expect(global.fetch).toHaveBeenCalledWith(
      'http://example.com/evaluacion/pregunta/responder',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });
  it('renderiza correctamente y maneja clics en el botón con error', async () => {
    const question = {
      pregunta: '¿Esta es una pregunta?',
      posibles_respuestas: [
        { id_respuesta: 1, respuesta: 'Respuesta 1' },
        { id_respuesta: 2, respuesta: 'Respuesta 2' },
      ]};

    const labels = {
      cta_next: 'Siguiente',
      label_question: 'Pregunta',
      label_of: 'de',
      cta_finished_test: 'Prueba finalizada',
    };

    const { getByText, getByLabelText } = render(
      <QuestionForm
        testId={1}
        question={question}
        currentQuestionIndex={0}
        onNextQuestion={jest.fn()}
        labels={labels}
      />
    );

    expect(getByText('¿Esta es una pregunta?')).toBeDefined();
    expect(getByText('Respuesta 1')).toBeDefined();
    expect(getByText('Respuesta 2')).toBeDefined();
    expect(getByText('Pregunta 1 de 5')).toBeDefined();
    expect(getByText('Siguiente')).toBeDefined();

    const rememberInput = document.getElementById('1') as HTMLInputElement;
    fireEvent.click(rememberInput);
    expect(rememberInput.checked).toBe(true);
  });
  it('renderiza correctamente y maneja clics en el botón con error', async () => {
    const question = {
      pregunta: '¿Esta es una pregunta?',
      posibles_respuestas: [
        { id_respuesta: 1, respuesta: 'Respuesta 1' },
        { id_respuesta: 2, respuesta: 'Respuesta 2' },
      ]};

    const labels = {
      cta_next: 'Siguiente',
      label_question: 'Pregunta',
      label_of: 'de',
      cta_finished_test: 'Prueba finalizada',
    };
    const { getByText, getByLabelText } = render(
      <QuestionForm
        testId={1}
        question={question}
        currentQuestionIndex={4}
        onNextQuestion={jest.fn()}
        labels={labels}
      />
    );
    const rememberInput = document.getElementById('1') as HTMLInputElement;
    fireEvent.click(rememberInput);
    expect(rememberInput.checked).toBe(true);
    fireEvent.click(getByText('Siguiente'));
    const finalText = document.getElementById('idFinal') as HTMLInputElement;
    expect(finalText).toBeDefined()
  });

 
});
