/**
A Component is the base class for the Questionnaire questions and sequences
*/
import DeclarationModel from './declaration.js';
import ControlModel from './control.js';
import GoToModel from './go-to.js';

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
      this._goTos = object._controls.map(function(goTo) {
        return new GoToModel(goTo);
      });

    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._name = "";
      this._label = "";
      this._declarations = [];
      this._controls = [];
      this._goTos = [];
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

  get goTos() {
    return this._goTos;
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

  removeControl(control) {
    var index = this._controls.indexOf(control);
    if (index > -1) {
      this._controls.splice(index, 1);
    } else {
      throw new Error('Control not in component');
    }
  }

  addControls(controls) {
    if (!(Array.isArray(controls))) throw new Error('The argument must be an array');
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
    if (!(Array.isArray(controls))) throw new Error('The argument must be an array');
    controls.map(function(control) {
      if (!(control instanceof ControlModel)) {
        throw new Error('All arguments must be of type Control');
      }
    });
    this._controls = controls;
  }

  addGoTo(goTo) {
    if (!(goTo instanceof GoToModel)) {
      throw new Error('The argument must be a GoTo');
    }
    this._goTos.push(goTo);
  }

  removeGoTo(goTo) {
    var index = this._goTos.indexOf(goTo);
    if (index > -1) {
      this._goTos.splice(index, 1);
    } else {
      throw new Error('GoTo not in component');
    }
  }

  addGoTos(goTos) {
    if (!(Array.isArray(goTos))) throw new Error('The argument must be an array');
    // Save current size in case something goes wrong
    var initialSize = this._goTos.length;
    try {
      goTos.map(function(goTo) {
        this.addGoTo(goTo);
      });
    } catch (e) {
      this._goTos.length(initialSize);
      throw new Error('All arguments must be of type GoTo');
    }
  }

  set goTos(goTos) {
    if (!(Array.isArray(goTos))) throw new Error('The argument must be an array');
    goTos.map(function(goTo) {
      if (!(goTo instanceof GoToModel)) {
        throw new Error('All arguments must be of type GoTo');
      }
    });
    this._goTos = goTos;
  }
}

export default ComponentModel;
