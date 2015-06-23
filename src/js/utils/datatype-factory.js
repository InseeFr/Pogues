// DatatypeModel factory
import NumericDatatypeModel from '../models/NumericDatatype'
import TextDatatypeModel from '../models/TextDatatype'
import DateDatatypeModel from '../models/DateDatatype'
var datatypeTypes = require('../models/model-constants').DatatypeModel.DATATYPE_TYPES;

const datatypeToModel = {
  NUMERIC: NumericDatatypeModel,
  TEXT: TextDatatypeModel,
  DATE: DateDatatypeModel
};

// Return available types
export let getDatatypeTypes = () => datatypeTypes;

// Simply return the class ; you should then instantiate it.
export let getClassFromDatatype = (typeName) => datatypeToModel[typeName];

// Instantiate the class
export let createDatatype = (typeName, data = {}) => new datatypeToModel[typeName](data);