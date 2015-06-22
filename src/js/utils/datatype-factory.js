// DatatypeModel factory
import NumericDatatypeModel from '../models/NumericDatatype'
import TextDatatypeModel from '../models/TextDatatype'
import DateDatatypeModel from '../models/DateDatatype'

const datatypeToModel = {
  NUMERIC: NumericDatatypeModel,
  TEXT: TextDatatypeModel,
  DATE: DateDatatypeModel
};

// Simply return the class ; you should then instanciate it.
export let getClassFromDatatype = (typeName) => datatypeToModel[typeName];

// Instanciate the class
export let createDatatype = (typeName, data = {}) => new datatypeToModel[typeName](data);