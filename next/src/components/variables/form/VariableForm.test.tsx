import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import VariableForm from './VariableForm';

vi.mock('@/components/ui/form/VTLEditor');

describe('VariableForm', () => {
  it('should enable the button only when all required fields are filled for an external variable', async () => {
    const submitFn = vi.fn();
    const { getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId={'q-id'}
        onSubmit={submitFn}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
      />,
    );

    await waitFor(() => {
      expect(getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'MY_VAR' },
    });
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'A great variable' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled();
    });

    fireEvent.submit(screen.getByRole('button', { name: /Validate/i }));
    await waitFor(() => {
      expect(submitFn).toBeCalled();
    });
  });

  it('should enable the button only when all required fields are filled for a calculated variable', async () => {
    const submitFn = vi.fn();
    const { getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId={'q-id'}
        onSubmit={submitFn}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
      />,
    );

    await waitFor(() => {
      expect(getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.click(getByRole('checkbox', { name: /calculated/i }));

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'MY_VAR' },
    });
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'A great variable' },
    });
    fireEvent.input(getByRole('textbox', { name: /formula/i }), {
      target: { value: 'my formula' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled();
    });

    fireEvent.submit(screen.getByRole('button', { name: /Validate/i }));
    await waitFor(() => {
      expect(submitFn).toBeCalled();
    });
  });

  it('should display form error when name is invalid', async () => {
    const { findAllByRole, getByRole, getByText, queryByRole } =
      await renderWithRouter(
        <VariableForm
          questionnaireId={'q-id'}
          onSubmit={vi.fn()}
          submitLabel="Validate"
          scopes={new Map<string, string>()}
        />,
      );

    expect(queryByRole('alert')).toBeNull();

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'ma' },
    });
    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: '' },
    });

    expect(await findAllByRole('alert')).toHaveLength(1);
    expect(getByText('You must provide a name')).toBeDefined();
  });

  it('should display form error when description is invalid', async () => {
    const { findAllByRole, getByRole, getByText, queryByRole } =
      await renderWithRouter(
        <VariableForm
          questionnaireId={'q-id'}
          onSubmit={vi.fn()}
          submitLabel="Validate"
          scopes={new Map<string, string>()}
        />,
      );

    expect(queryByRole('alert')).toBeNull();

    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'ma_' },
    });
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: '' },
    });

    expect(await findAllByRole('alert')).toHaveLength(1);
    expect(getByText('You must provide a description')).toBeDefined();
  });
});
