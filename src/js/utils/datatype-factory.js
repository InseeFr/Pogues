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
let getClassFromDatatype = (typeName) => datatypeToModel[typeName];

// Instanciate the class
let createDatatype = (typeName, data = {}) => new datatypeToModel[typeName](data);

export default createDatatype;