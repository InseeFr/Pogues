/**
A Component is the base class for the Questionnaire questions and sequences
*/
import DeclarationModel from './Declaration.js';

class ComponentModel {
  constructor() {
    this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    console.log('Component creating new instance with id ' + this._id);
    this._name = "";
    this._label = "";
    this._declarations = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  get declarations() {
    return this._declarations;
  }

  // TODO do we need a setter for id?

  set name(name) {
    if (typeof name !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._name = name;
  }

  set label(label) {
    if (typeof label !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._label = label;
  }

  addDeclaration(declaration) {
    if (!(declaration instanceof DeclarationModel)) {
      throw new Error('The argument must be a Declaration');
    }
    this._declarations.push(declaration);
  }

  addDeclarations(declarations) {
    // Save current size in case something goes wrong
    var initialSize = this._declarations.length;
    try {
      declarations.map(function(declaration) {
        this.addDeclaration(declaration);
      });
    } catch (e) {
      this._declarations.length(initialSize);
      throw new Error('All arguments must be of type Declaration');
    }
  }

  set declarations(declarations) {
    declarations.map(function(declaration) {
      if (!(declaration instanceof DeclarationModel)) {
        throw new Error('All arguments must be of type Declaration');
      }
    });
    this._declarations = declarations;
  }
}

export default ComponentModel;
