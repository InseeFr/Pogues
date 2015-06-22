/**
A response to a question
*/
import DatatypeModel from './Datatype';
import CodeListModel from './CodeList';
import { createDatatype } from '../utils/datatype-factory'

class ResponseModel {
  constructor(object) {
    if (object) {
      this._simple = object._simple;
      this._mandatory = object._mandatory;
      this._codeListReference = object._codeListReference;
      this._datatype = object._datatype;
      this._datatype = createDatatype(object._datatype._typeName, object._datatype);  
      this._values = object._values;
    } else {
      this._simple = true;
      this._mandatory = false;
      this._codeListReference = null;
      this._datatype = new DatatypeModel();
      this._values = [];
    }
  }

  get simple() {
    return this._simple;
  }

  get mandatory() {
    return this._mandatory;
  }

  get predefinedLabels() {
    return this._predefinedLabels;
  }

  get datatype() {
    return this._datatype;
  }

  get values() {
    return this._values;
  }

  set simple(bool) {
    if (typeof bool !== 'boolean') {
      throw new Error('The parameter must be a boolean');
    }
    this._simple = bool;
  }

  set mandatory(bool) {
    if (typeof bool !== 'boolean') {
      throw new Error('The parameter must be a boolean');
    }
    this._mandatory = bool;
  }

  addPredefinedLabel(predefinedLabel) {
    if (typeof predefinedLabel !== 'string') {
      throw new Error('The argument must be a string');
    }
    this._predefinedLabels.push(predefinedLabel);
  }

  addPredefinedLabels(predefinedLabels) {
    // Save current size in case something goes wrong
    var initialSize = this._predefinedLabels.length;
    try {
      predefinedLabels.map(function(predefinedLabel) {
        this.addPredefinedLabel(predefinedLabel);
      });
    } catch (e) {
      this._predefinedLabels.length(initialSize);
      throw new Error('All arguments must be of type string');
    }
  }

  set predefinedLabels(predefinedLabels) {
    try {
      predefinedLabels.map(function(predefinedLabel) {
        if (typeof predefinedLabel !== 'string') {
          throw new Error('All arguments must be of type string');
        }
      });
    } catch (e) {
      throw new Error('All arguments must be strings');
    }
    this._predefinedLabels = predefinedLabels;
  }

  set datatype(datatype) {
    if (!(datatype instanceof DatatypeModel)) {
      throw new Error('The argument must be a Datatype');
    }
    this._datatype = datatype;
  }

  addValue(value) {
    // No type check for response values
    this.values.push(value);
  }

  removeValue(value) {
    var index = this._values.indexOf(value);
    if (index > -1) {
      this._values.splice(index, 1);
    } else {
      throw new Error('Value not in response');
    }
  }

  addValues(values) {
    // We just check that 'values' is an array
    if (!(Array.isArray(values))) {
      throw new Error('The argument must be an array');
    }
    this._values.concat(values);
  }

  set values(values) {
    // We just check that 'values' is an array
    if (!(Array.isArray(values))) {
      throw new Error('The argument must be an array');
    }
    this._values = values;
  }
}

export default ResponseModel;
