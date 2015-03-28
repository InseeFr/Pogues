/**
A response to a question
*/
class ResponseModel {
  constructor() {
    this._simple = true;
    this._predefinedLabels = [];
    this._values = [];
  }

  get simple() {
    return this._simple;
  }

  get predefinedLabels() {
    return this._predefinedLabels;
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

  addValue(value) {
    // No type check for response values
    this.values.push(value);
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
