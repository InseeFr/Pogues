import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ValidationModal from '.';

describe('ValidationModal Component', () => {
  const mockOnClose = vi.fn();
  const testErrors = ['Error 1', 'Error 2', 'Error 3'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(
      <ValidationModal
        isOpen={false}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    expect(
      screen.queryByText('An error occurred while validation of questionnaire'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Error 1')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    expect(
      screen.getByText('An error occurred while validation of questionnaire'),
    ).toBeInTheDocument();
  });

  it('should display all error messages when errors array is provided', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    testErrors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it('should not display error list when errors is undefined', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={undefined}
        onClose={mockOnClose}
      />,
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should not display error list when errors is empty array', () => {
    render(<ValidationModal isOpen={true} errors={[]} onClose={mockOnClose} />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should call onClose when button is clicked', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    const fixButton = screen.getByText('Fix questionnaire');
    fireEvent.click(fixButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should have correct modal classes', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('custom-modal');
    expect(modal).toHaveClass('validation-error');
  });

  it('should have correct error title class', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    const title = screen.getByText(
      'An error occurred while validation of questionnaire',
    );
    expect(title).toHaveClass('validation-error-title');
  });

  it('should have correct error message classes', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    const errorItems = screen.getAllByRole('listitem');
    errorItems.forEach((item) => {
      expect(item).toHaveClass('api-error-message');
    });
  });

  it('should have correct button class', () => {
    render(
      <ValidationModal
        isOpen={true}
        errors={testErrors}
        onClose={mockOnClose}
      />,
    );

    const button = screen.getByText('Fix questionnaire');
    expect(button).toHaveClass('modal-button');
  });
});
