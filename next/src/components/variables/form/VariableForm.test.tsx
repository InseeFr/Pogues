import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
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
    const { getByRole, getByText } = await renderWithRouter(
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

    fireEvent.click(within(getByText(/Calculated/i)).getByRole('radio'));

    fireEvent.input(getByRole('textbox', { name: /Name/i }), {
      target: { value: 'MY_VAR' },
    });
    fireEvent.input(getByRole('textbox', { name: /Description/i }), {
      target: { value: 'A great variable' },
    });
    fireEvent.input(getByRole('textbox', { name: /Formula/i }), {
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

  it('should disable datatype.typeName select by default when variable is external', async () => {
    const { getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
      />,
    );

    const datatypeSelect = getByRole('combobox', { name: /datatype/i });

    await waitFor(() => {
      expect(datatypeSelect).toBeDisabled();
    });
  });

  it('should allow as datatype options text/date/numeric/boolean for a calculated variable', async () => {
    const { findAllByRole, getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
        isExternalDatatypeTypeNameEditable
        variable={{
          type: VariableType.Calculated,
          name: 'VAR_CALC',
          description: 'test calculated',
          scope: '',
          datatype: {
            typeName: DatatypeType.Numeric,
            minimum: 0,
            maximum: 10,
            decimals: 0,
          },
        }}
      />,
    );

    const datatypeSelect = getByRole('combobox', { name: /datatype/i });
    expect(datatypeSelect).toBeEnabled();

    // open select
    fireEvent.click(datatypeSelect);
    const options = await findAllByRole('option');

    // allowed options : text, date, numeric, boolean
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent(/text/i);
    expect(options[1]).toHaveTextContent(/date/i);
    expect(options[2]).toHaveTextContent(/number/i);
    expect(options[3]).toHaveTextContent(/boolean/i);
  });

  it('should allow only Text + current datatype option for an external variable when editable', async () => {
    const { findAllByRole, getByRole } = await renderWithRouter(
      <VariableForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        submitLabel="Validate"
        scopes={new Map<string, string>()}
        isExternalDatatypeTypeNameEditable
        variable={{
          type: VariableType.External,
          name: 'VAR_EXT',
          description: 'test external',
          scope: '',
          datatype: {
            typeName: DatatypeType.Numeric,
            minimum: 0,
            maximum: 10,
            decimals: 0,
          },
        }}
      />,
    );

    const datatypeSelect = getByRole('combobox', { name: /datatype/i });
    expect(datatypeSelect).toBeEnabled();

    // open select
    fireEvent.click(datatypeSelect);
    const options = await findAllByRole('option');

    // allowed options : text and current variable datatype typeName
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent(/text/i);
    expect(options[1]).toHaveTextContent(/number/i);
  });
});
