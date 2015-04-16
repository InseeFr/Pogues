/**
A response Datatype
*/
import ModelConstants from './model-constants';

var DATATYPE_TYPES = ModelConstants.DatatypeModel.DATATYPE_TYPES;

class DatatypeModel {
  constructor(object) {
    if (object) {
      this._typeName = object._typeName;
    } else {
      this._typeName = object._typeName;
    }
  }

  get typeName() {
    return this._typeName;
  }

  set typeName(typeName) {
    if (DATATYPE_TYPES.indexOf(typeName) === -1) {
      throw new Error(typeName + 'is not a valid declaration type');
    }
    this._typeName = typeName;
  }
}

export default DatatypeModel;
