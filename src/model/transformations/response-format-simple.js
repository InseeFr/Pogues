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
    typeName === 'DATE' && format1 ? format1.toLowerCase() : format1;

  const datatype = {};
  if (maxLength !== undefined) datatype.maxLength = maxLength;
  if (pattern !== undefined) datatype.pattern = pattern;
  if (minimum !== undefined) datatype.minimum = minimum;
  if (maximum !== undefined) datatype.maximum = maximum;
  if (decimals !== undefined) datatype.decimals = decimals;
  if (unit !== undefined) datatype.unit = unit;
  if (format !== undefined) datatype.format = format;

  if (datatype.minimum !== undefined && typeName === 'DURATION') {
    let strminimum = datatype.minimum;
    let strmaximum = datatype.maximum;
    let matches_minimum = strminimum.match(/\d+/g);
    let matches_maximum = strmaximum.match(/\d+/g);
    if (format !== undefined && format === 'PTnHnM') {
      datatype.mihours = matches_minimum[0];
      datatype.miminutes = matches_minimum[1];
      datatype.mahours = matches_maximum[0];
      datatype.maminutes = matches_maximum[1];
    }
    if (format !== undefined && format === 'PnYnM') {
      datatype.miyears = matches_minimum[0];
      datatype.mimonths = matches_minimum[1];
      datatype.mayears = matches_maximum[0];
      datatype.mamonths = matches_maximum[1];
    }

    datatype.miyears = datatype.miyears === 0 ? '' : datatype.miyears;
    datatype.mimonths = datatype.mimonths === 0 ? '' : datatype.mimonths;
    datatype.mayears = datatype.mayears === 0 ? '' : datatype.mayears;
    datatype.mamonths = datatype.mamonths === 0 ? '' : datatype.mamonths;
    datatype.mihours = datatype.mihours === 0 ? '' : datatype.mihours;
    datatype.miminutes = datatype.miminutes === 0 ? '' : datatype.miminutes;
    datatype.mahours = datatype.mahours === 0 ? '' : datatype.mahours;
    datatype.maminutes = datatype.miyears === 0 ? '' : datatype.maminutes;
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
