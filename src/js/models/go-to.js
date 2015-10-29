/**
A control on a response or several responses
*/
import ExpressionModel from './expression';
import ComponentModel from './component';

class GoToModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._description = object._description;
      this._expression = object._expression;
      this._ifTrue = object._ifTrue;
      if (object._ifFalse) this._ifFalse = object._ifFalse;
      if (object._next) this._next = object._next;
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._description = '';
      //FIXME we're turning to simple text for expression, ifTrue and ifFalse
      //it seems inline with the Pogues Model
      this._expression = '';
      this._ifTrue = '';
      // GoTos are created without '_ifFalse' or '_ifTrue' member
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

  get ifTrue() {
    return this._ifTrue;
  }

  get ifFalse() {
    return this._ifFalse;
  }

  get next() {
    return this.next;
  }

  set description(description) {
    if (typeof description !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._description = description;
  }

  set expression(expression) {
    if (typeof expression !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._expression = expression;
  }

  set ifTrue(ifTrue) {
    if (typeof ifTrue !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._ifTrue = ifTrue;
  }

  // TODO Add integrity control: only one of else or next should be valued
  set ifFalse(ifFalse) {
    if (typeof ifFalse !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._ifFalse = ifFalse;
  }

  set next(next) {
    if (!(next instanceof GoToModel)) {
      throw new Error('The argument must be a GoTo');
    }
    this._next = next;
  }

}

export default GoToModel;
