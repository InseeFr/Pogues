/**
A Component is the base class for the Questionnaire questions and sequences
*/
import ComponentModel from './component.js';
import DeclarationModel from './declaration.js';

class ComponentGroupModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._name = object._name;
      this._label = object._label;
      this._declarations = object._declarations.map(function(declaration) {
        return new DeclarationModel(declaration);
      });
      this._members = object._members.map(function(member) {
        return new ComponentModel(member);
      });
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._name = "";
      this._label = "";
      this._declarations = [];
      this._members = [];
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

  get members() {
    return this._members;
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
    if (!(Array.isArray(declarations))) throw new Error('The argument must be an array');
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
    if (!(Array.isArray(declarations))) throw new Error('The argument must be an array');
    declarations.map(function(declaration) {
      if (!(declaration instanceof DeclarationModel)) {
        throw new Error('All arguments must be of type Declaration');
      }
    });
    this._declarations = declarations;
  }

  addMember(member) {
    if (!(member instanceof ComponentModel)) {
      throw new Error('The argument must be a Component');
    }
    this._member.push(member);
  }

  removeMember(member) {
    var index = this._members.indexOf(member);
    if (index > -1) {
      this._members.splice(index, 1);
    } else {
      throw new Error('Member not in group');
    }
  }

  addMembers(members) {
    if (!(Array.isArray(members))) throw new Error('The argument must be an array');
    // Save current size in case something goes wrong
    var initialSize = this._members.length;
    try {
      members.map(function(member) {
        this.addMember(member);
      });
    } catch (e) {
      this._members.length(initialSize);
      throw new Error('All arguments must be of type Component');
    }
  }

  set members(members) {
    if (!(Array.isArray(members))) throw new Error('The argument must be an array');
    members.map(function(member) {
      if (!(member instanceof ComponentModel)) {
        throw new Error('All arguments must be of type Component');
      }
    });
    this._members = members;
  }
}

export default ComponentGroupModel;
