/**
A CodeList represents a list of strings that will be used as answer categories
*/

class CodeListModel {
  constructor() {
    this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    console.log('Component creating new instance with id ' + this._id);
    this._name = '';
    this._label = '';
    this._categories = [];
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

  get categories() {
    return this._categories;
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

  addCategory(category) {
    if (!typeof label !== 'string') {
      throw new Error('The argument must be a string');
    }
    this._categories.push(category);
  }
}

export default ComponentModel;
