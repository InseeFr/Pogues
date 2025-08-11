import {
  VariableType as ModelVariableType,
  type Variable,
} from '@/models/variables';

import VariableDatatype from '../VariableDatatype';
import VariableType from '../VariableType';

interface Props {
  variable: Variable;
}

/**
 * Display a line with variable information to be used in the variables overview table.
 */
export default function VariableLine({ variable }: Readonly<Props>) {
  return (
    <tr className="bg-default odd:bg-main *:p-4">
      <td>{variable.name}</td>
      <td>{variable.description}</td>
      <td>
        <VariableDatatype datatype={variable.datatype.typeName} />
      </td>
      <td>
        <VariableType
          formula={
            variable.type === ModelVariableType.Calculated
              ? variable.formula
              : undefined
          }
          type={variable.type}
        />
      </td>
    </tr>
  );
}
