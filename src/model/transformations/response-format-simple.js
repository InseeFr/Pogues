import * as Response from './response';
import { DATATYPE_NAME, DURATION_UNIT } from 'constants/pogues-constants';

export function remoteToState(remote) {
  console.log(remote);
  const {
    responses: [
      {
        Datatype: {
          typeName: remoteTypeName,
          MaxLength: maxLength,
          Pattern: pattern,
          Minimum: minimum,
          Maximum: maximum,
          Decimals: decimals,
          Unit: unit,
        },
        mandatory,
        id,
      },
    ],
  } = remote;

  const typeName =
    remoteTypeName === DATATYPE_NAME.DURATION
      ? DATATYPE_NAME.NUMERIC
      : remoteTypeName;
  const datatype = {};

  if (maxLength !== undefined) datatype.maxLength = maxLength;
  if (pattern !== undefined) datatype.pattern = pattern;
  if (minimum !== undefined) datatype.minimum = minimum;
  if (maximum !== undefined) datatype.maximum = maximum;
  if (decimals !== undefined) datatype.decimals = decimals;
  if (unit !== undefined) datatype.unit = unit;

  return {
    id,
    type: typeName,
    mandatory,
    [typeName]: datatype,
  };
}
export function stateToRemote(state, collectedVariables) {
  const { mandatory, id } = state;
  let { type: typeName } = state;
  const dataType = state[typeName];

  const suffix =
    dataType.unit &&
    dataType.unit.substr(
      dataType.unit.lastIndexOf('/') + 1,
      dataType.unit.length,
    );

  if (DURATION_UNIT.includes(suffix)) {
    typeName = DATATYPE_NAME.DURATION;
  }
  return {
    Response: [
      Response.stateToRemote({
        ...dataType,
        id,
        typeName,
        mandatory,
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}
