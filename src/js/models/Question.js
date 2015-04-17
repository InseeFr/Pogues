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
      this._responses = object._responses.map(ResponseModel.bind(null, object));
    } else {
      this._simple = true;
      this._filter = new FilterModel();
      this._responses = [];
    }
  }

  get simple() {
    return this._simple;
  }

  get filter() {
    return this._filter;
  }

  get responses() {
    return this._responses;
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

  addResponse(response) {
    if (!(response instanceof ResponseModel)) {
      throw new Error('The argument must be a Response');
    }
    this._responses.push(response);
  }

  removeResponse(response) {
    var index = this._responses.indexOf(response);
    if (index > -1) {
      this._responses.splice(index, 1);
    } else {
      throw new Error('Response is not in response array');
    }
  }

  addResponses(responses) {
    if (!(Array.isArray(responses))) throw new Error('The argument must be an array');
    // Save current size in case something goes wrong
    var initialSize = this._responses.length;
    try {
      responses.map(function(response) {
        this.addResponse(response);
      });
    } catch (e) {
      this._responses.length(initialSize);
      throw new Error('All arguments must be of type Response');
    }
  }

  set responses(responses) {
    if (!(Array.isArray(responses))) throw new Error('The argument must be an array');
    responses.map(function(response) {
      if (!(response instanceof ResponseModel)) {
        throw new Error('All arguments must be of type Response');
      }
    });
    this._responses = responses;
  }
}

export default QuestionModel;
