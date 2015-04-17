/**
A control on a response or several responses
*/
import ExpressionModel from './Expression';

class ControlModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._description = object._description;
      this._expression = object._expression;
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._description = '';
      this._expression = new ExpressionModel();
    }
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  get expression() {
    return this._expression;
  }

  set description(description) {
    if (typeof description !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._description = description;
  }

  set expression(expression) {
    if (!(expression instanceof ExpressionModel)) {
      throw new Error('The parameter must be a string');
    }
    this._expression = expression;
  }
}

export default ControlModel;
