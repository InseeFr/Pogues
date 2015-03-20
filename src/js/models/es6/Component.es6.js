/**
A Component is the base class for the Questionnaire element
*/
import Declaration from './Declaration.js'

class Component {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.name = "";
    this.label = "";
    this.declarations = [];
  }

  set setName(name) {
    this.name = name;
  }

  set setLabel(label) {
    this.label = label;
  }

  addDeclaration(declaration) {
    if(!(declaration instanceof Declaration)) {
      throw new Error('The type of the argument is not Declaration !');
    }
    this.declarations.push(declaration);
  }
}

export default Component;
