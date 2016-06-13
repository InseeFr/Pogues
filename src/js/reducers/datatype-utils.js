import {
  DATATYPE_NAME, DATATYPE_VIZ_HINT
} from '../constants/pogues-constants'

export const emptyTextDatatype = {
  typeName: DATATYPE_NAME.TEXT,
  visualizationHint: DATATYPE_VIZ_HINT.CHECKBOX,  
  maxLength: 0,
  pattern: ''
}

export const emptyNumericDatatype = {
  typeName: DATATYPE_NAME.NUMERIC,
  visualizationHint: DATATYPE_VIZ_HINT.CHECKBOX,
  minimum: 0,
  maximum: 100,
  decimals: 2 
}

export const emptyDateDatatype = {
  typeName: DATATYPE_NAME.DATE,
  visualizationHint: DATATYPE_VIZ_HINT.CHECKBOX,  
  minimum: new Date(),
  maximum: new Date(),
  format: ''
}

export const emptyDatatypeFactory = {
  [DATATYPE_NAME.TEXT]: emptyTextDatatype,
  [DATATYPE_NAME.NUMERIC]: emptyNumericDatatype,
  [DATATYPE_NAME.DATE]: emptyDateDatatype
}