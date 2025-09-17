import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import VariableForm from './VariableForm';

vi.mock('@/components/ui/form/VTLEditor');

describe('VariableForm', () => {
  it('should enable the button only when all fields are filled', async () => {
    const submitFn = vi.fn();
    const { getByRole } = await renderWithRouter(
      <VariableForm
        onSubmit={submitFn}
        submitLabel="Validate"
        scopes={new Set<string>()}
      />,
    );

    await waitFor(() => {
      expect(getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'MA_VAR' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled();
    });

    fireEvent.submit(screen.getByRole('button', { name: /Validate/i }));
    await waitFor(() => {
      expect(submitFn).toBeCalled();
    });
  });

  it('should display form error when values are invalid', async () => {
    const { findAllByRole, getByRole, getByText, queryByRole } =
      await renderWithRouter(
        <VariableForm
          onSubmit={vi.fn()}
          submitLabel="Validate"
          scopes={new Set<string>()}
        />,
      );

    expect(queryByRole('alert')).toBeNull();

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'ma var' },
    });

    expect(await findAllByRole('alert')).toHaveLength(1);
    expect(
      getByText('Name must be in SCREAMING_SNAKE_CASE format'),
    ).toBeDefined();

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: '' },
    });

    expect(await findAllByRole('alert')).toHaveLength(1);
    expect(getByText('You must provide a name')).toBeDefined();
  });
});
