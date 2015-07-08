/**
A date response datatype
*/
import DatatypeModel from './datatype';

import ModelConstants from './model-constants';

var DATATYPE_TYPES = ModelConstants.DatatypeModel.DATATYPE_TYPES;

class DateDatatypeModel extends DatatypeModel {
  constructor(object) {
    super(object);
    if (object) {
      this._minimum = object._minimum;
      this._maximum = object._maximum;
      this._format = object._format;
    } else {
      this._minimum = new Date();
      this._maximum = new Date();
      this._format = '';
    }
    this._type = 'DateDatatypeType';
    this._typeName = DATATYPE_TYPES[0];
  }

  get minimum() {
    return this._minimum;
  }

  get maximum() {
    return this._maximum;
  }

  get format() {
    return this._format;
  }

  set minimum(minimum) {
    if (!(minimum instanceof Date)) {
      throw new Error('The parameter must be a Date object');
    }
    this._minimum = minimum;
  }

  set maximum(maximum) {
    if (!(maximum instanceof Date)) {
      throw new Error('The parameter must be a Date object');
    }
    this._maximum = maximum;
  }

  set format(format) {
    if (typeof format !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._format = format;
  }

}

export default DateDatatypeModel;
