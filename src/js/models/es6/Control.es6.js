/**
A control on a response or several responses
*/
class Control {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.description = '';
    this.expression = '';
  }

  get getDescription() {
    return this.description;
  }

  get getExpression() {
    return this.expression;
  }

  set setDescription(description) {
    if(!(typeof description === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.description = description;
  }

  set setExpression(expression) {
    if(!(typeof expression === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.expression = expression;
  }
}

export default Control;
