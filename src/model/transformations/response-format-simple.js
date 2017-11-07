import * as Response from './response';

export function remoteToState(remote) {
  const {
    responses: [
      {
        Datatype: {
          typeName,
          MaxLength: maxLength,
          Pattern: pattern,
          Minimum: minimum,
          Maximum: maximum,
          Decimals: decimals,
          Unit: unit,
        },
        mandatory,
      },
    ],
  } = remote;

  const datatype = {};

  if (maxLength !== undefined) datatype.maxLength = maxLength;
  if (pattern !== undefined) datatype.pattern = pattern;
  if (minimum !== undefined) datatype.minimum = minimum;
  if (maximum !== undefined) datatype.maximum = maximum;
  if (decimals !== undefined) datatype.decimals = decimals;
  if (unit !== undefined) datatype.unit = unit;

  return {
    type: typeName,
    mandatory,
    [typeName]: datatype,
  };
}

export function stateToRemote(state, collectedVariables) {
  const { type: typeName, mandatory } = state;
  const dataType = state[typeName];
  return {
    Response: [Response.stateToRemote({ ...dataType, typeName, mandatory, collectedVariable: collectedVariables[0] })],
  };
}
