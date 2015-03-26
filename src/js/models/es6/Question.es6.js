/**
A Question
*/
import Component from './Component.js';
import Filter from './Filter.js';
import Response from './Response.js';

class Question extends Component {
  constructor() {
    super();
    this._simple = true;
    this._mandatory = false;
    this._filter = new Filter();
    this._response = new Response();
  }

  get simple() {
    return this._simple;
  }

  get mandatory() {
    return this._mandatory;
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

  set mandatory(bool) {
    if (typeof bool !== 'boolean') {
      throw new Error('The parameter must be a boolean');
    }
    this._mandatory = bool;
  }

  set filter(filter) {
    if (!(filter instanceof Filter)) {
      throw new Error('The argument must be a Filter');
    }
    this._filter = filter;
  }

  set response(response) {
    if (!(response instanceof Response)) {
      throw new Error('The argument must be a Response');
    }
    this._response = response;
  }
}

export default Question;
