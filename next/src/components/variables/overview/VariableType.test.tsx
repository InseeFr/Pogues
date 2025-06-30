import { VariableType as Type } from '@/models/variables';
import { renderWithI18n } from '@/tests/tests';

import VariableType from './VariableType';

describe('VariableType', () => {
  it.each([
    { type: Type.Collected, label: 'Collected' },
    { type: Type.Calculated, label: 'Calculated' },
    { type: Type.External, label: 'External' },
  ])(
    'display correct variable type label ($type -> $label)',
    async ({ type, label }) => {
      const { getByText } = renderWithI18n(<VariableType type={type} />);

      expect(getByText(label)).toBeInTheDocument();
    },
  );
});
