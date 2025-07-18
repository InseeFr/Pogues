import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithI18n } from '@/tests/tests';

import VariablesScopeOverviewItemContent from './VariablesScopeOverviewItemContent';

describe('VariablesScopeOverviewItemContent', () => {
  it('display scope information', async () => {
    const { getByText } = renderWithI18n(
      <VariablesScopeOverviewItemContent
        scope="my scope"
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

    expect(getByText('Scope my scope')).toBeInTheDocument();
    expect(getByText('2 variables')).toBeInTheDocument();
  });
});
