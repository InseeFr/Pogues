import * as Response from './response';
import { DATATYPE_NAME, DURATION_UNIT } from 'constants/pogues-constants';

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
          Format: format1,
        },
        mandatory,
        id,
      },
    ],
  } = remote;
  const format =
    typeName === DATATYPE_NAME.DATE && format1 ? format1.toLowerCase() : format1;
  const datatype = {};
  if (maxLength !== undefined) datatype.maxLength = maxLength;
  if (pattern !== undefined) datatype.pattern = pattern;
  if (minimum !== undefined) datatype.minimum = minimum;
  if (maximum !== undefined) datatype.maximum = maximum;
  if (decimals !== undefined) datatype.decimals = decimals;
  if (unit !== undefined) datatype.unit = unit;
  if (format !== undefined) datatype.format = format;

  if (datatype.minimum !== undefined && typeName === DATATYPE_NAME.DURATION) {
    let strminimum = datatype.minimum;
    let strmaximum = datatype.maximum;
    let matches_minimum = strminimum.match(/\d+/g);
    let matches_maximum = strmaximum.match(/\d+/g);
    if (format !== undefined && format === 'PTnHnM') {
      datatype.mihours = matches_minimum[0] == 0 ? '' : matches_minimum[0];
      datatype.miminutes = matches_minimum[1] == 0 ? '' : matches_minimum[1];
      datatype.mahours = matches_maximum[0] == 0 ? '' : matches_maximum[0];
      datatype.maminutes = matches_maximum[1] == 0 ? '' : matches_maximum[1];
    }
    if (format !== undefined && format === 'PnYnM') {
      datatype.miyears = matches_minimum[0] == 0 ? '' : matches_minimum[0];
      datatype.mimonths = matches_minimum[1] == 0 ? '' : matches_minimum[1];
      datatype.mayears = matches_maximum[0] == 0 ? '' : matches_maximum[0];
      datatype.mamonths = matches_maximum[1] == 0 ? '' : matches_maximum[1];
    }

  }
  
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

  let customDataType = dataType;

  if (customDataType.format !== undefined && typeName === DATATYPE_NAME.DATE) {
    const { format, minimum, maximum, ...dateDataType } = dataType;

    dateDataType.format = format.toUpperCase();
    if (customDataType.minimum !== '') {
      dateDataType.minimum = minimum;
    }

    if (customDataType.maximum !== '') {
      dateDataType.maximum = maximum;
    }

    customDataType = dateDataType;
  }

  if (typeName === DATATYPE_NAME.DURATION) {
    const {
      miyears,
      mimonths,
      mayears,
      mamonths,
      mihours,
      miminutes,
      mahours,
      maminutes,
      ...durationDataType
    } = customDataType;

    if (dataType.format === 'PnYnM') {
      durationDataType.minimum = `P${miyears || 0}Y${mimonths || 0}M`;
      durationDataType.maximum = `P${mayears || 0}Y${mamonths || 0}M`;
    }
    if (dataType.format === 'PTnHnM') {
      durationDataType.minimum = `PT${mihours || 0}H${miminutes || 0}M`;
      durationDataType.maximum = `PT${mahours || 0}H${maminutes || 0}M`;
    }

    customDataType = durationDataType;
  }
  return {
    Response: [
      Response.stateToRemote({
        ...customDataType,
        id,
        typeName,
        mandatory,
        collectedVariable: collectedVariables[0],
      }),
    ],
  };

}
