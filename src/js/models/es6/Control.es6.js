/**
A control on a response or several responses
*/
class Control {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.description = '';
    this.expression = '';
  }
}

export default Control;
