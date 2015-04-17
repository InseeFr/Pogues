/**
A Question
*/
import ComponentModel from './Component.js';
import FilterModel from './Filter.js';
import ResponseModel from './Response.js';

class QuestionModel extends ComponentModel {
  constructor(object) {
    super(object);
    if (object) {
      this._simple = object._simple;
      this._filter = new FilterModel(object._filter);
      this._response = new ResponseModel(object._response);
    } else {
      this._simple = true;
      this._filter = new FilterModel();
      this._response = new ResponseModel();
    }
  }

  get simple() {
    return this._simple;
  }

  get filter() {
    return this._filter;
  }

  get response() {
    return this._response;
  }

  set simple(bool) {
    if (typeof bool !== 'boolean') {
      throw new Error('The parameter must be a boolean');
    }
    this._simple = bool;
  }

  set filter(filter) {
    if (!(filter instanceof FilterModel)) {
      throw new Error('The argument must be a Filter');
    }
    this._filter = filter;
  }

  set response(response) {
    if (!(response instanceof ResponseModel)) {
      throw new Error('The argument must be a Response');
    }
    this._response = response;
  }
}

export default QuestionModel;
