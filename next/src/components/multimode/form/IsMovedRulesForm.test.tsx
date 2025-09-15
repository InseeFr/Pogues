import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithRouter } from '@/testing/render';

import IsMovedRulesForm from './IsMovedRulesForm';

vi.mock('@/components/ui/form/VTLEditor');

describe('IsMovedRulesForm', () => {
  it('is disabled on mount', async () => {
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <IsMovedRulesForm questionnaireId="my-id" onSubmit={vi.fn()} />,
      ),
    );
    expect(getByText('Validate')).toBeInTheDocument();
    expect(getByText('Validate')).toBeDisabled();
  });

  it('can be submitted when form is dirty', async () => {
    const user = userEvent.setup();

    const onSubmitMock = vi.fn();
    const { getByText } = await waitFor(() =>
      renderWithRouter(
        <IsMovedRulesForm questionnaireId="my-id" onSubmit={onSubmitMock} />,
      ),
    );

    expect(getByText('Validate')).toBeDisabled();

    await user.click(getByText('Questionnaire-level rule'));
    await user.keyboard('my questionnaire');

    expect(getByText('Validate')).toBeEnabled();

    await user.click(getByText('Validate'));

    expect(onSubmitMock).toHaveBeenCalledOnce();
  });

  it('has a roundabout-level rule input when there is roundabout variables', async () => {
    const { getByRole, getByText } = await waitFor(() =>
      renderWithRouter(
        <IsMovedRulesForm
          questionnaireId="my-id"
          onSubmit={vi.fn()}
          roundaboutVariables={[
            {
              id: 'my-id',
              name: "It's me, variable",
              datatype: { typeName: DatatypeType.Boolean },
              type: VariableType.Collected,
            },
          ]}
        />,
      ),
    );

    expect(getByText('Roundabout-level rule')).toBeInTheDocument();
    expect(
      getByRole('textbox', { name: 'Roundabout-level rule' }),
    ).toBeInTheDocument();
  });

  it('has no roundabout-level rule input when there is no roundabout variables', async () => {
    const { getByText, queryByRole } = await waitFor(() =>
      renderWithRouter(
        <IsMovedRulesForm questionnaireId="my-id" onSubmit={vi.fn()} />,
      ),
    );

    expect(getByText('Roundabout-level rule')).toBeInTheDocument();
    expect(
      queryByRole('textbox', { name: 'Roundabout-level rule' }),
    ).toBeNull();
    expect(
      getByText(
        'Rule cannot be specified if there is no roundabout, or no variables associated to the roundabout.',
      ),
    ).toBeInTheDocument();
  });
});
