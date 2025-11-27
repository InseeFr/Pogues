import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithRouter } from '@/testing/render';

import VariablesTable from './VariablesTable';

describe('VariablesTable', () => {
  it('display provided variables', async () => {
    const { getByText } = await renderWithRouter(
      <VariablesTable
        questionnaireId="q-id"
        variables={[
          {
            id: 'my-id',
            name: 'MY_VAR',
            description: 'This var likes strawberries',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
          {
            id: 'my-id2',
            name: 'MY_VAR2',
            description: 'This var likes chocolate',
            datatype: { typeName: DatatypeType.Numeric },
            type: VariableType.Collected,
          },
        ]}
      />,
    );

    expect(getByText('MY_VAR')).toBeInTheDocument();
    expect(getByText('MY_VAR2')).toBeInTheDocument();
  });
});
