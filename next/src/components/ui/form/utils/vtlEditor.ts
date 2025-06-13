import {
  Variable as AntlrVariable,
  VariableRole as AntlrVariableRole,
  VariableType as AntlrVariableType,
  Variables as AntlrVariables,
} from '@making-sense/antlr-editor/model';

import { DatatypeType } from '@/models/variables/datatype';
import { Variable } from '@/models/variables/variables';

export function computeAntlrVariables(variables: Variable[]): AntlrVariables {
  const antlrVariablesArray = variables.map((variable) => {
    // Determine the type (BOOLEAN, NUMBER, STRING) based on datatype
    let type: AntlrVariableType;
    switch (variable.datatype.typeName) {
      case DatatypeType.Boolean:
        type = AntlrVariableType.BOOLEAN;
        break;
      case DatatypeType.Numeric:
        type = AntlrVariableType.NUMBER;
        break;
      default:
        // for duration, date and text variable, there is no other possible type than STRING accepted by Antlr
        type = AntlrVariableType.STRING;
    }

    return [
      variable.name,
      {
        type,
        role: AntlrVariableRole.IDENTIFIER,
        name: variable.name,
        label: variable.label,
      },
    ] as [string, AntlrVariable];
  });

  // Convert the array of tuples into an object
  return Object.fromEntries(antlrVariablesArray);
}
