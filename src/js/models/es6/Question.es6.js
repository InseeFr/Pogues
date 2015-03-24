/**
A Question
*/
import Component from './Component.js'
import Filter from './Filter.js'
import Response from './Response.js'

class Question extends Component {
  constructor() {
    super();
    this.simple = true;
    this.mandatory = false;
    this.filter new Filter();
    this.response = new Response();
  }

  // TODO Should it be 'get' or 'is' for booleans?
  get getSimple() {
    return this.simple;
  }

  get getMandatory() {
    return this.mandatory;
  }

  get getFilter() {
    return this.filter;
  }

  get getResponse() {
    return this.response;
  }

  set setSimple(bool) {
    if(!(typeof bool === 'boolean')) {
      throw new Error('The parameter must be a boolean');
    }
    this.simple = bool;
  }

  set setMandatory(bool) {
    if(!(typeof bool === 'boolean')) {
      throw new Error('The parameter must be a boolean');
    }
    this.mandatory = bool;
  }

  set setFilter(filter) {
    if(!(filter instanceof Filter)) {
      throw new Error('The argument must be a Filter');
    }
    this.filter = filter;
  }

  set setResponse(response) {
    if(!(response instanceof Response)) {
      throw new Error('The argument must be a Response');
    }
    this.response = response;
  }
}

export default Question;
