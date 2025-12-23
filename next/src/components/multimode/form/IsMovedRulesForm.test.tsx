import userEvent from '@testing-library/user-event';

import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithRouter } from '@/testing/render';

import IsMovedRulesForm from './IsMovedRulesForm';

const mockNavigate = vi.fn();

vi.mock('@/components/ui/form/VTLEditor');

// Mock useNavigate from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('IsMovedRulesForm', () => {
  it('is disabled on mount', async () => {
    const user = userEvent.setup();
    const foo = vi.fn();

    // Given a form
    const { getByText } = await renderWithRouter(
      <IsMovedRulesForm questionnaireId="my-id" onSubmit={foo} />,
    );

    // Then it is disabled by default
    expect(getByText('Validate')).toBeInTheDocument();
    expect(getByText('Validate')).toBeDisabled();

    // When an input is modified
    await user.click(getByText('Questionnaire-level rule'));
    await user.keyboard('my questionnaire');

    // Then the form can be submitted
    expect(getByText('Validate')).toBeEnabled();
    await user.click(getByText('Validate'));

    expect(foo).toHaveBeenCalledOnce();
  });

  it('has a roundabout-level rule input when there is roundabout variables', async () => {
    // Given a form with roundabout variables
    const { getByRole, getByText } = await renderWithRouter(
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
    );

    // Then the roundabout-level rule can be specified
    expect(getByText('Roundabout-level rule')).toBeInTheDocument();
    expect(
      getByRole('textbox', { name: 'Roundabout-level rule' }),
    ).toBeInTheDocument();
  });

  it('has no roundabout-level rule input when there is no roundabout variables', async () => {
    // Given a form without roundabout variables
    const { getByText, queryByRole } = await renderWithRouter(
      <IsMovedRulesForm questionnaireId="my-id" onSubmit={vi.fn()} />,
    );

    // Then the roundabout-level rule cannot be specified
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

  it("allows to go back to multimode overview page by clicking 'cancel' button", async () => {
    // Given a form in dirty state
    const user = userEvent.setup();
    const { getByRole, getByText } = await renderWithRouter(
      <IsMovedRulesForm questionnaireId="my-id" onSubmit={vi.fn()} />,
    );
    await user.click(getByText('Questionnaire-level rule'));
    await user.keyboard('my questionnaire');

    // When we click on cancel
    await user.click(getByRole('button', { name: /cancel/i }));

    // Then we navigate to the multimode page
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/questionnaire/$questionnaireId/multimode',
      params: { questionnaireId: 'my-id' },
      ignoreBlocker: true,
    });
  });
});
