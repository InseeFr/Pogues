// DatatypeModel factory
import NumericDatatypeModel from '../models/numeric-datatype'
import TextDatatypeModel from '../models/text-datatype'
import DateDatatypeModel from '../models/data-datatype'
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