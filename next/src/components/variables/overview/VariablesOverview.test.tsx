import userEvent from '@testing-library/user-event';

import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithI18n } from '@/tests/tests';

import VariablesOverview from './VariablesOverview';

describe('VariablesOverview', () => {
  it('display variables and filter them', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText, queryByText } = renderWithI18n(
      <VariablesOverview
        questionnaireId="my-questionnaire"
        variables={[
          {
            id: 'my-id',
            name: 'MY_VAR',
            label: 'This var likes strawberries',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
        ]}
      />,
    );

    expect(getByText('MY_VAR')).toBeInTheDocument();

    await user.click(getByRole('button', { name: /External/i }));
    expect(queryByText('MY_VAR')).toBeNull();
  });
});
