import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithRouter } from '@/testing/render';

import VariableLineActions from './VariableLineActions';

const mockNavigate = vi.fn();
// Mock useNavigate from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('VariableLineActions', () => {
  it('allow to edit an external variable', async () => {
    // Given an external variable
    const user = userEvent.setup();
    await renderWithRouter(
      <VariableLineActions
        questionnaireId="q-id"
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.External,
        }}
      />,
    );

    // When we open the actions menu
    await user.click(screen.getByRole('button', { name: 'actions' }));
    await screen.findByRole('menu');

    // Then we can edit the variable
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId/variables/variable/$variableId',
      params: { questionnaireId: 'q-id', variableId: 'my-id' },
    });
  });

  it('allow to delete an external variable', async () => {
    // Given an external variable
    const user = userEvent.setup();
    await renderWithRouter(
      <VariableLineActions
        questionnaireId="q-id"
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.External,
        }}
      />,
    );

    // When we open the actions menu
    await user.click(screen.getByRole('button', { name: 'actions' }));
    await screen.findByRole('menu');

    // Then we can delete the variable
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }));

    await screen.findByRole('dialog');
    await screen.findByText('Delete variable: MY_VAR');
    expect(screen.getByText('Delete variable: MY_VAR')).toBeInTheDocument();
  });

  it('allow to edit a calculated variable', async () => {
    // Given an calculated variable
    const user = userEvent.setup();
    await renderWithRouter(
      <VariableLineActions
        questionnaireId="q-id"
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.External,
        }}
      />,
    );

    // When we open the actions menu
    await user.click(screen.getByRole('button', { name: 'actions' }));
    await screen.findByRole('menu');

    // Then we can edit the variable
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId/variables/variable/$variableId',
      params: { questionnaireId: 'q-id', variableId: 'my-id' },
    });
  });

  it('allows to delete a calculated variable', async () => {
    // Given a calculated variable
    const user = userEvent.setup();
    await renderWithRouter(
      <VariableLineActions
        questionnaireId="q-id"
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.Calculated,
        }}
      />,
    );

    // When we open the actions menu
    await user.click(screen.getByRole('button', { name: 'actions' }));
    await screen.findByRole('menu');

    // Then we can delete the variable
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }));

    await screen.findByRole('dialog');
    await screen.findByText('Delete variable: MY_VAR');
    expect(screen.getByText('Delete variable: MY_VAR')).toBeInTheDocument();
  });

  it('does not allow to edit or delete a collected variable', async () => {
    // Given a collected variable
    const user = userEvent.setup();
    await renderWithRouter(
      <VariableLineActions
        questionnaireId="q-id"
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.Collected,
        }}
      />,
    );

    // When we open the actions menu
    await user.click(screen.getByRole('button', { name: 'actions' }));
    await screen.findByRole('menu');

    // Then we cannot edit or delete the variable
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute(
      'data-disabled',
    );
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
      'data-disabled',
    );
  });
  it('does not allow to edit or delete a variable in readonly', async () => {
    // Given an external variable
    const user = userEvent.setup();
    await renderWithRouter(
      <VariableLineActions
        questionnaireId="q-id"
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.External,
        }}
        readonly
      />,
    );

    // When we open the actions menu
    await user.click(screen.getByRole('button', { name: 'actions' }));
    await screen.findByRole('menu');

    // Then we cannot edit or delete the variable
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute(
      'data-disabled',
    );
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
      'data-disabled',
    );
  });
});
