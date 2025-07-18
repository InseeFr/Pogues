import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithI18n } from '@/tests/tests';

import VariableLine from './VariableLine';

describe('VariableLine', () => {
  it('display variable information', async () => {
    const { getByText } = renderWithI18n(
      <VariableLine
        variable={{
          id: 'my-id',
          name: 'MY_VAR',
          description: 'This var likes strawberries',
          datatype: { typeName: DatatypeType.Text },
          type: VariableType.Collected,
        }}
      />,
    );

    expect(getByText('MY_VAR')).toBeInTheDocument();
    expect(getByText('This var likes strawberries')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
    expect(getByText('Collected')).toBeInTheDocument();
  });
});
