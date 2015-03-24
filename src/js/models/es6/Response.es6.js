/**
A response to a question
*/
class Response {
  constructor() {
    this.simple = true;
    this.predefinedLabels = [];
    this.values = [];
  }

  // TODO Should it be 'get' or 'is' for booleans?
  get getSimple() {
    return this.simple;
  }

  set setSimple(bool) {
    if(!(typeof bool === 'boolean')) {
      throw new Error('The parameter must be a boolean');
    }
    this.simple = bool;
  }

  addPredefinedLabel(predefinedLabel) {
    if(!(typeof predefinedLabel === 'string')) {
      throw new Error('The argument must be a string');
    }
    this.predefinedLabels.push(predefinedLabel);
  }

  set setPredefinedLabels(predefinedLabel) {
    // Save current size in case something goes wrong
    initialSize = this.predefinedLabels.length;
    try {
      predefinedLabels.map(function(predefinedLabel) {
        this.addPredefinedLabel(predefinedLabel);
      });
    } catch (e) {
      this.predefinedLabels.length(initialSize);
      throw new Error('All arguments must be strings');
    }
  }

  addValue(value) {
    // No type check for response values
    this.values.push(value);
  }

  addValues(values) {
    // We just check that 'values' is an array
    if(!(Array.isArray(values))) {
      throw new Error('The argument must be an array');
    }
    this.values.concat(values);
  }

  set setValues(declarations) {
    // We just check that 'values' is an array
    if(!(Array.isArray(values))) {
      throw new Error('The argument must be an array');
    }
    this.values = values;
  }
}

export default Response;
