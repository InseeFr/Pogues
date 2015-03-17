/**
A Component is the base class for the Questionnaire element
*/
class Component {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }
}

export default Component;
