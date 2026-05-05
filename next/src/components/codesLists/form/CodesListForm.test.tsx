import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import CodesListForm from './CodesListForm';

const mockNavigate = vi.fn();

vi.mock('@/components/ui/form/VTLEditor');

vi.mock('../create/ImportCodesListFromCsv', () => ({
  default: ({
    onImportSuccess,
    onCancel,
  }: {
    onImportSuccess: (v: unknown) => void;
    onCancel: () => void;
  }) => (
    <div>
      <button
        type="button"
        onClick={() =>
          onImportSuccess({
            label: '',
            codes: [{ value: 'imported-code', label: 'Imported Label', codes: [] }],
          })
        }
      >
        Trigger import
      </button>
      <button type="button" onClick={onCancel}>
        Cancel import
      </button>
    </div>
  ),
}));

// Mock useNavigate from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CodesListForm', () => {
  it('should enable the button only when all fields are filled', async () => {
    const submitFn = vi.fn();
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={submitFn}
        variables={[]}
      />,
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: {
        value: 'my label',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.input(screen.getByTestId('codes.0.value'), {
      target: {
        value: 'my code value',
      },
    });
    fireEvent.input(screen.getByTestId('codes.0.label'), {
      target: {
        value: 'my code label',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled();
    });

    fireEvent.submit(screen.getByRole('button', { name: /Validate/i }));
    await waitFor(() => {
      expect(submitFn).toBeCalled();
    });
  });

  it('should display "must have label" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: { value: 'my label' },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: { value: '' },
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByText('You must provide a label')).toBeDefined();
  });

  it('should display "code must have value" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    );

    fireEvent.input(screen.getByTestId('codes.0.value'), {
      target: { value: 'my code value' },
    });
    fireEvent.input(screen.getByTestId('codes.0.value'), {
      target: { value: '' },
    });

    expect((await screen.findAllByRole('alert')).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getByText('Your code must have a value')).toBeDefined();
  });

  it('should display "code must have label" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    );

    fireEvent.input(screen.getByTestId('codes.0.label'), {
      target: { value: 'my code value' },
    });
    fireEvent.input(screen.getByTestId('codes.0.label'), {
      target: { value: '' },
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByText('Your code must have a label')).toBeDefined();
  });

  it('should display "value must be unique" error when duplicate value', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Add a code/i }));
    fireEvent.input(screen.getByTestId('codes.0.value'), {
      target: { value: 'abc' },
    });
    fireEvent.input(screen.getByTestId('codes.1.value'), {
      target: { value: 'abc' },
    });

    await waitFor(async () => {
      expect(
        (await screen.findAllByRole('alert')).length,
      ).toBeGreaterThanOrEqual(2);
    });
    expect(
      await screen.findAllByText('Value must be unique: "abc"'),
    ).toHaveLength(2);
  });

  it('should add and remove a code correctly', async () => {
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        variables={[]}
      />,
    );

    // Adding a code
    fireEvent.click(screen.getByRole('button', { name: /Add a code/i }));
    fireEvent.input(screen.getByTestId('codes.1.value'), {
      target: { value: 'code1' },
    });
    fireEvent.input(screen.getByTestId('codes.1.label'), {
      target: { value: 'label1' },
    });

    // Remove the code
    fireEvent.click(screen.getAllByTitle('Delete')[1]);

    await waitFor(() => {
      expect(screen.queryByTestId('codes.1.value')).toBeNull();
    });
  });

  it("allows to go back to codesLists overview page by clicking 'cancel' button", async () => {
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={vi.fn()}
        variables={[]}
      />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: {
        value: 'my label',
      },
    });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    expect(cancelButton).toBeEnabled();
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId/codes-lists',
      params: { questionnaireId: 'q-id' },
      ignoreBlocker: true,
    });
  });

  it('should show and hide the CSV import panel', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} allowCsvImport />,
    );

    expect(screen.queryByRole('button', { name: /Trigger import/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /Import codes/i }));
    expect(screen.getByRole('button', { name: /Trigger import/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cancel import/i }));
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Trigger import/i })).toBeNull();
    });
  });

  it('should fill the form with imported codes and close the panel on import success', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} allowCsvImport />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Import codes/i }));

    fireEvent.click(screen.getByRole('button', { name: /Trigger import/i }));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Trigger import/i })).toBeNull();
    });

    await waitFor(() => {
      expect(screen.getByTestId('codes.0.value')).toHaveValue('imported-code');
      expect(screen.getByTestId('codes.0.label')).toHaveValue('Imported Label');
    });
  });
});
