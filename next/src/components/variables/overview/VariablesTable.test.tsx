import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithI18n } from '@/tests/tests';

import VariablesTable from './VariablesTable';

describe('VariablesTable', () => {
  it('display provided variables', async () => {
    const { getByText } = renderWithI18n(
      <VariablesTable
        variables={[
          {
            id: 'my-id',
            name: 'MY_VAR',
            label: 'This var likes strawberries',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
          {
            id: 'my-id2',
            name: 'MY_VAR2',
            label: 'This var likes chocolate',
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
