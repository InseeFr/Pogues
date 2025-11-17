import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithRouter } from '@/testing/render';

import VariableLineActions from './VariableLineActions';

describe('VariableLineActions', () => {
  it('allow to edit a variable', async () => {
    // Given a variable
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

    // Then we can edit the variable
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
  });

  it('allow to delete a variable', async () => {
    // Given a variable
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

    // Then we can delete the variable
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }));

    //await screen.findByRole('dialog');
    //expect(screen.getByText('Delete the variable')).toBeInTheDocument();
  });
});
