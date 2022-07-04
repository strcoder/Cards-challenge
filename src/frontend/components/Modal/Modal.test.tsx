/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Modal from './index';

describe('<Modal />', () => {
  test('Modal shows the title and the children and a close button', () => {
    const handleClose = jest.fn();

    const { getByText } = render(
      <Modal
        show={true}
        onClose={handleClose}
      >
        <p>Prueba</p>
      </Modal>,
    );

    expect(getByText('Prueba')).toBeTruthy();

    fireEvent.click(getByText(/close/i));
    fireEvent.click(screen.getByTitle(/close modal/i));

    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
