/**
A Component is the base class for the Questionnaire questions and sequences
*/
import DeclarationModel from './Declaration.js';
import ControlModel from './Control.js';

class ComponentModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._name = object._name;
      this._label = object._label;
      this._declarations = object._declarations.map(function(declaration) {
        return new DeclarationModel(declaration);
      });
      this._controls = object._controls.map(function(control) {
        return new ControlModel(control);
      });
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._name = "";
      this._label = "";
      this._declarations = [];
      this._controls = [];
    }
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

  get controls() {
    return this._controls;
  }

  set id(id) {
    if (typeof id !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._id = id;
  }

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

  removeDeclaration(declaration) {
    var index = this._declarations.indexOf(declaration);
    if (index > -1) {
      this._declarations.splice(index, 1);
    } else {
      throw new Error('Declaration not in component');
    }

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


  addControl(control) {
    if (!(control instanceof ControlModel)) {
      throw new Error('The argument must be a Control');
    }
    this._controls.push(control);
  }

  addControls(controls) {
    // Save current size in case something goes wrong
    var initialSize = this._controls.length;
    try {
      controls.map(function(control) {
        this.addControl(control);
      });
    } catch (e) {
      this._controls.length(initialSize);
      throw new Error('All arguments must be of type Control');
    }
  }

  set controls(controls) {
    controls.map(function(control) {
      if (!(control instanceof ControlModel)) {
        throw new Error('All arguments must be of type Control');
      }
    });
    this._controls = controls;
  }

}

export default ComponentModel;
