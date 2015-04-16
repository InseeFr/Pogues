/**
An expression (for example XPath) defining a function triggering a control or go to
*/
class ExpressionModel {
  constructor(object) {
    if (object) {
      this._text = object._text;
    } else {
      this._text = '';
    }
  }

  get text() {
    return this._text;
  }

  set text(text) {
    if (typeof text !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._text = text;
  }
}

export default ExpressionModel;
