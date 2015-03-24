/**
A Component is the base class for the Questionnaire questions and sequences
*/
import Declaration from './Declaration.js'

class Component {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.name = "";
    this.label = "";
    this.declarations = [];
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getLabel() {
    return this.label;
  }

  get getDeclarations() {
    return this.declarations;
  }

  // TODO do we need a setter for id?

  set setName(name) {
    if(!(typeof name === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.name = name;
  }

  set setLabel(label) {
    if(!(typeof label === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.label = label;
  }

  addDeclaration(declaration) {
    if(!(declaration instanceof Declaration)) {
      throw new Error('The argument must be a Declaration');
    }
    this.declarations.push(declaration);
  }

  addDeclarations(declarations) {
    // Save current size in case something goes wrong
    initialSize = this.declarations.length;
    try {
      declarations.map(function(declaration) {
        this.addDeclaration(declaration);
      });
    } catch (e) {
      this.declarations.length(initialSize);
      throw new Error('All arguments must be of type Declaration');
    }
  }

  set setDeclarations(declarations) {
    children.map(function(declaration) {
      if(!(declaration instanceof Declaration)) {
        throw new Error('All arguments must be of type Declaration');
      }
    });
    this.declarations = declarations;
  }
}

export default Component;
