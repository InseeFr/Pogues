/**
A response Datatype
*/

const DATATYPE_TYPES = ['DATE', 'NUMERIC', 'TEXT'];

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
    if (!(typeName in TYPES)) {
      throw new Error(typeName + 'is not a valid declaration type');
    }
    this._typeName = typeName;
  }
}

export default DatatypeModel;
