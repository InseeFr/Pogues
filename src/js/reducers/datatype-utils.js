import {
  DATATYPE_NAME, DATATYPE_VIZ_HINT
} from '../constants/pogues-constants'

//Initially, empty datatypes assigned default values to each property. But in
//the ui, we wanted the datatype editor properties to start empty so it seemed
//irrelevant.
//We only keep a `typeName` property : former versions of Pogues keep a
//supplementary `type` property : for instance `TextDatatypeType` for a
//datatype of type text. This `type`  property will be created when we
//serialize the questionnaire : it is equivalent to type name (one to one
//relationship) so it's unecessary risky to keep both properties in the
//reducer.

export const emptyTextDatatype = {
  typeName: DATATYPE_NAME.TEXT,
  visualizationHint: DATATYPE_VIZ_HINT.CHECKBOX,
  maxLength: undefined,
  pattern: undefined
}

export const emptyNumericDatatype = {
  typeName: DATATYPE_NAME.NUMERIC,
  visualizationHint: DATATYPE_VIZ_HINT.CHECKBOX,
  minimum: undefined,
  maximum: undefined,
  decimals: undefined 
}

export const emptyDateDatatype = {
  typeName: DATATYPE_NAME.DATE,
  visualizationHint: DATATYPE_VIZ_HINT.CHECKBOX,
  minimum: undefined,
  maximum: undefined,
  format: undefined
}

export const emptyDatatypeFactory = {
  [DATATYPE_NAME.TEXT]: emptyTextDatatype,
  [DATATYPE_NAME.NUMERIC]: emptyNumericDatatype,
  [DATATYPE_NAME.DATE]: emptyDateDatatype
}