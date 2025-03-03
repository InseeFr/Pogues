import {
  Variable as AntlrVariable,
  VariableRole as AntlrVariableRole,
  VariableType as AntlrVariableType,
  Variables as AntlrVariables,
} from '@making-sense/antlr-editor/model';

import { DatatypeType } from '@/models/variables/datatype';
import { Variable, VariableType } from '@/models/variables/variables';

export function getAntlrVariables(variables: Variable[]): AntlrVariables {
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

    // Determine the role (MEASURE, IDENTIFIER) based on the variable type
    let role: AntlrVariableRole;
    if (variable.type === VariableType.Collected) {
      role = AntlrVariableRole.MEASURE;
    } else {
      // External and Calculated variables
      role = AntlrVariableRole.IDENTIFIER;
    }

    return [
      variable.name,
      {
        type,
        role,
        name: variable.name,
        label: variable.label,
      },
    ] as [string, AntlrVariable];
  });

  // Convert the array of tuples into an object
  return Object.fromEntries(antlrVariablesArray);
}
