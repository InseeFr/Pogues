import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import ArticulationForm from './ArticulationForm';

// mock VTLEditor as a classic input
vi.mock('@/components/ui/form/VTLEditor');

describe('ArticulationForm', () => {
  const mockSubmit = vi.fn();
  it('should enable validate button only when all articulation items fields are filled', async () => {
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={mockSubmit} />,
    );

    // no data for any articulation item
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    // fill first name field
    fireEvent.input(screen.getByTestId('items.0.value'), {
      target: {
        value: 'first name formula',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    // fill gender field
    fireEvent.input(screen.getByTestId('items.1.value'), {
      target: {
        value: 'gender formula',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    // fill age field
    fireEvent.input(screen.getByTestId('items.2.value'), {
      target: {
        value: 'age formula',
      },
    });

    // all articulation item fields have been filled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled();
    });

    fireEvent.submit(screen.getByRole('button', { name: /Validate/i }));
    await waitFor(() => {
      expect(mockSubmit).toBeCalled();
    });
  });

  it('should display error when first name field is empty', async () => {
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={mockSubmit} />,
    );

    fireEvent.input(screen.getByTestId('items.0.value'), {
      target: {
        value: 'first name formula',
      },
    });
    fireEvent.input(screen.getByTestId('items.0.value'), {
      target: {
        value: '',
      },
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(
      screen.getByText('You must provide a formula for first name'),
    ).toBeDefined();
  });

  it('should display error when gender field is empty', async () => {
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={mockSubmit} />,
    );

    fireEvent.input(screen.getByTestId('items.1.value'), {
      target: {
        value: 'gender formula',
      },
    });
    fireEvent.input(screen.getByTestId('items.1.value'), {
      target: {
        value: '',
      },
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(
      screen.getByText('You must provide a formula for gender'),
    ).toBeDefined();
  });

  it('should display error when age field is empty', async () => {
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={mockSubmit} />,
    );

    fireEvent.input(screen.getByTestId('items.2.value'), {
      target: {
        value: 'age formula',
      },
    });
    fireEvent.input(screen.getByTestId('items.2.value'), {
      target: {
        value: '',
      },
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(
      screen.getByText('You must provide a formula for age'),
    ).toBeDefined();
  });

  it('should enable cancel button', async () => {
    await renderWithRouter(
      <ArticulationForm questionnaireId="q-id" onSubmit={mockSubmit} />,
    );

    const cancelButton = screen.getByRole('link', { name: /cancel/i });

    expect(cancelButton).toBeEnabled();
    expect(cancelButton).toHaveAttribute(
      'href',
      '/questionnaire/q-id/articulation',
    );
  });
});
