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
      this._response = object._response.map(ResponseModel.bind(null, object));
    } else {
      this._simple = true;
      this._filter = new FilterModel();
      this._response = [];
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
    // TODO check response is an array
    response.map(function(child) {
      if (!(child instanceof ResponseModel)) {
        throw new Error('All arguments must be of type Response');
      }
    });
    this._response = response;
  }
  // TODO remove response model
  // 
  addResponse(response) {
    this._response.push(response)
  }

}

export default QuestionModel;
