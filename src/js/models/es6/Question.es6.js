/**
A Question
*/
import Component from './Component.js'

class Question extends Component {
  constructor() {
    super();
    this.simple = true;
    this.mandatory = true;
    this.filter;
    this.response;
  }
}

export default Question;
