import { DATATYPE_NAME } from 'constants/pogues-constants';

// Initially, empty datatypes assigned default values to each property. But in
// the ui, we wanted the datatype editor properties to start empty so it seemed
// irrelevant.
// We only keep a `typeName` property : former versions of Pogues keep a
// supplementary `type` property : for instance `TextDatatypeType` for a
// datatype of type text. This `type`  property will be created when we
// serialize the questionnaire : it is equivalent to type name (one to one
// relationship) so it's unecessary risky to keep both properties in the
// reducer.

/**
 * Convert invalid number strings to empty strings
 *
 * Invalid strings and `null` will return an empty string
 * @param  {[type]} rawNumber [description]
 * @return {[type]}           [description]
 */
function toNumber(rawNumber) {
  const n = parseFloat(rawNumber);
  return isNaN(n) ? '' : n.toString();
}

export const emptyTextDatatype = {
  typeName: DATATYPE_NAME.TEXT,
  maxLength: 1,
  pattern: '',
};

export const emptyNumericDatatype = {
  typeName: DATATYPE_NAME.NUMERIC,
  minimum: '',
  maximum: '',
  decimals: '',
};

export const emptyDateDatatype = {
  typeName: DATATYPE_NAME.DATE,
  minimum: '',
  maximum: '',
  format: '',
};

export const emptyBooleanDatatype = {
  typeName: DATATYPE_NAME.BOOLEAN,
};

export const emptyDatatypeFactory = {
  typeName: DATATYPE_NAME.TEXT,
  [DATATYPE_NAME.TEXT]: emptyTextDatatype,
  [DATATYPE_NAME.NUMERIC]: emptyNumericDatatype,
  [DATATYPE_NAME.DATE]: emptyDateDatatype,
  [DATATYPE_NAME.BOOLEAN]: emptyBooleanDatatype,
};

// TODO think again (see #112 and #123) ; see how it works with `NaN`x
export function processDatatypeForSerialization(datatype) {
  const { typeName } = datatype;
  if (typeName === DATATYPE_NAME.NUMERIC) {
    const { minimum, maximum, decimals } = datatype;
    return {
      typeName,
      minimum: parseFloat(minimum),
      maximum: parseFloat(maximum),
      decimals: parseFloat(decimals),
    };
  }
  if (typeName === DATATYPE_NAME.TEXT)
    return {
      ...datatype,
      maxLength: parseFloat(datatype.maxLength),
    };
  return datatype;
}

export function parseDatatype(datatype) {
  const { typeName } = datatype;
  let result = {};
  if (typeName === DATATYPE_NAME.NUMERIC) {
    const { minimum, maximum, decimals } = datatype;
    result = {
      typeName,
      minimum: toNumber(minimum),
      maximum: toNumber(maximum),
      decimals: toNumber(decimals),
    };
  }
  if (typeName === DATATYPE_NAME.TEXT) {
    const { maxLength } = datatype;
    result = {
      ...datatype,
      maxLength: toNumber(maxLength),
    };
  }
  return result;
}
