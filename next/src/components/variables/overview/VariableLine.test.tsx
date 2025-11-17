import { DatatypeType } from '@/models/datatype';
import { VariableType } from '@/models/variables';
import { renderWithRouter } from '@/testing/render';

import VariableLine from './VariableLine';

describe('VariableLine', () => {
  it('display variable information', async () => {
    const { getByText } = await renderWithRouter(
      <table>
        <tbody>
          <VariableLine
            questionnaireId="q-id"
            variable={{
              id: 'my-id',
              name: 'MY_VAR',
              description: 'This var likes strawberries',
              datatype: { typeName: DatatypeType.Text },
              type: VariableType.Collected,
            }}
          />
        </tbody>
      </table>,
    );

    expect(getByText('MY_VAR')).toBeInTheDocument();
    expect(getByText('This var likes strawberries')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
    expect(getByText('Collected')).toBeInTheDocument();
  });
});
