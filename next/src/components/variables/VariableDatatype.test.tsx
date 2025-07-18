import { DatatypeType } from '@/models/datatype';
import { renderWithI18n } from '@/tests/tests';

import VariableDatatype from './VariableDatatype';

describe('VariableDatatype', () => {
  it.each([
    { datatype: DatatypeType.Boolean, label: 'Boolean' },
    { datatype: DatatypeType.Date, label: 'Date' },
    { datatype: DatatypeType.Duration, label: 'Duration' },
    { datatype: DatatypeType.Numeric, label: 'Number' },
    { datatype: DatatypeType.Text, label: 'Text' },
  ])(
    'display correct variable datatype label ($datatype -> $label)',
    async ({ datatype, label }) => {
      const { getByText } = renderWithI18n(
        <VariableDatatype datatype={datatype} />,
      );

      expect(getByText(label)).toBeInTheDocument();
    },
  );
});
