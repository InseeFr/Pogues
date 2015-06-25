/**
A response Datatype
*/
import ModelConstants from './model-constants';

var DATATYPE_TYPES = ModelConstants.DatatypeModel.DATATYPE_TYPES;

class DatatypeModel {
  constructor(object) {
    if (new.target === DatatypeModel) {
      throw new TypeError('This class is abstract, you cannot construct an instance directly.');
    }
    if (object) {
      this._typeName = object._typeName;
      this._visualizationHint = object._visualizationHint;
    } else {
      this._typeName = DATATYPE_TYPES[2]; // TEXT by default
      this._visualizationHint = 'checkbox';
    }
  }

  get typeName() {
    return this._typeName;
  }

  get visualizationHint() {
    return this._visualizationHint;
  }

  set typeName(typeName) {
    if (DATATYPE_TYPES.indexOf(typeName) === -1) {
      throw new Error(typeName + ' is not a valid declaration type');
    }
    this._typeName = typeName;
  }

  set visualizationHint(hint) {
    if (typeof hint !== 'string') {
      throw new Error('The visualization hint must be a string.');
    }
    this._visualizationHint = hint;
  }
}

export default DatatypeModel;
