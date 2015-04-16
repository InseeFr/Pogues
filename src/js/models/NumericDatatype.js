/**
A numeric response datatype
*/
import DatatypeModel from './Datatype.js';

class NumericDatatypeModel extends DatatypeModel {
  constructor(object) {
    super(object);
    if (object) {
      this._minimum = object._minimum;
      this._maximum = object._maximum;
      this._decimals = object._decimals;
    } else {
      this._minimum = 0;
      this._maximum = 100;
      this._decimals = 2;
    }
    this._typeName = DATATYPE_TYPES[1];
  }

  get minimum() {
    return this._minimum;
  }

  get maximum() {
    return this._maximum;
  }

  get decimals() {
    return this._decimals;
  }

  set minimum(minimum) {
    if (typeof typeName !== 'number') {
      throw new Error('The parameter must be a number');
    }
    this._minimum = minimum;
  }

  set maximum(maximum) {
    if (typeof typeName !== 'number') {
      throw new Error('The parameter must be a number');
    }
    this._maximum = maximum;
  }

  set decimals(decimals) {
    if (typeof typeName !== 'number') {
      // TODO Sould in fact be an integer
      throw new Error('The parameter must be a number');
    }
    this._decimals = decimals;
  }
}

export default NumericDatatypeModel;
