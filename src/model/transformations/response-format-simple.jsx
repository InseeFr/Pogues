import { DATATYPE_NAME } from '../../constants/pogues-constants';
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
          Format: format,
        },
        mandatory,
        id,
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
  if (format !== undefined) datatype.format = format;

  if (typeName === DATATYPE_NAME.DURATION) {
    if (datatype.minimum !== undefined) {
      const strminimum = datatype.minimum;
      const matches_minimum = strminimum.match(/\d+/g);
      if (format === 'PTnHnM') {
        [datatype.mihours, datatype.miminutes] = matches_minimum;
      }
      if (format === 'PnYnM') {
        [datatype.miyears, datatype.mimonths] = matches_minimum;
      }
    }
    if (datatype.maximum !== undefined) {
      const strmaximum = datatype.maximum;
      const matches_maximum = strmaximum.match(/\d+/g);
      if (format === 'PTnHnM') {
        [datatype.mahours, datatype.maminutes] = matches_maximum;
      }
      if (format === 'PnYnM') {
        [datatype.mayears, datatype.mamonths] = matches_maximum;
      }
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
  const { type: typeName } = state;
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
    } = customDataType;
    const durationDataType = {};

    durationDataType.format = dataType.format;

    if (dataType.format === 'PnYnM') {
      if (miyears || mimonths) {
        durationDataType.minimum = `P${miyears || 0}Y${mimonths || 0}M`;
      }
      if (mayears || mamonths) {
        durationDataType.maximum = `P${mayears || 0}Y${mamonths || 0}M`;
      }
    }
    if (dataType.format === 'PTnHnM') {
      if (mihours || miminutes) {
        durationDataType.minimum = `PT${mihours || 0}H${miminutes || 0}M`;
      }
      if (mahours || maminutes) {
        durationDataType.maximum = `PT${mahours || 0}H${maminutes || 0}M`;
      }
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
