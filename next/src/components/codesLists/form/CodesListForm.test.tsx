import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/tests/tests';

import CodesListForm from './CodesListForm';

vi.mock('@/components/ui/form/VTLEditor');

it('should enable the button only when all fields are filled', async () => {
  const submitFn = vi.fn();
  renderWithRouter(
    <CodesListForm questionnaireId="q-id" onSubmit={submitFn} variables={[]} />,
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
  renderWithRouter(<CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />);

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
  renderWithRouter(<CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />);

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
  renderWithRouter(<CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />);

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
  renderWithRouter(<CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />);

  fireEvent.click(screen.getByRole('button', { name: /Add a code/i }));
  fireEvent.input(screen.getByTestId('codes.0.value'), {
    target: { value: 'abc' },
  });
  fireEvent.input(screen.getByTestId('codes.1.value'), {
    target: { value: 'abc' },
  });

  expect((await screen.findAllByRole('alert')).length).toBeGreaterThanOrEqual(
    2,
  );
  expect(
    await screen.findAllByText('Value must be unique: "abc"'),
  ).toHaveLength(2);
});

it('should add and remove a code correctly', async () => {
  renderWithRouter(
    <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} variables={[]} />,
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
