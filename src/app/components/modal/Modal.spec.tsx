import React from 'react';
import { render, screen } from '@testing-library/react';

import Modal from './Modal';

describe('Modal component', () => {
  it('should render modal correctly', () => {
    render(
      <Modal
        title={'Modal title'}
        body={'Modal body'}
        onClose={jest.fn()}
        onPrimaryCta={jest.fn()}
        onSecondaryCta={jest.fn()}
      />
    );

    const title = screen.getByText('Modal title');
    const body = screen.getByText('Modal body');

    expect(title).toBeDefined();
    expect(body).toBeDefined();
    screen.debug();

  });

  it('should render modal correctly with no cta buttons', () => {
    render(
      <Modal
        title={'Modal title'}
        body={'Modal body'}
        onClose={jest.fn()}
      />
    );

    const title = screen.getByText('Modal title');
    const body = screen.getByText('Modal body');

    expect(title).toBeDefined();
    expect(body).toBeDefined();
  });
});
