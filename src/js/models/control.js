/**
A control on a response or several responses
*/
import ExpressionModel from './expression';
import ModelConstants from './model-constants';

var CONTROL_CRITICITY = ModelConstants.ControlModel.CONTROL_CRITICITY;

class ControlModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._description = object._description;
      this._expression = object._expression;
      this._failMessage = object._failMessage;
      this._criticity = object._criticity;
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._description = '';
      this._expression = new ExpressionModel();
      this._failMessage = '';
      this._criticity = CONTROL_CRITICITY[0]; // INFO by default
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

  get failMessage() {
    return this._failMessage;
  }

  get criticity() {
    return this._criticity;
  }

  set description(description) {
    if (typeof description !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._description = description;
  }

  set expression(expression) {
    if (!(expression instanceof ExpressionModel)) {
      throw new Error('The parameter must be an Expression');
    }
    this._expression = expression;
  }

  set failMessage(failMessage) {
    if (typeof failMessage !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._failMessage = failMessage;
  }

  set criticity(criticity) {
    if (CONTROL_CRITICITY.indexOf(criticity) === -1) {
      throw new Error(criticity + ' is not a valid criticity level');
    }
    this._criticity = criticity;
  }
}

export default ControlModel;
