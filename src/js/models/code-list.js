/**
A CodeList represents a list of strings that will be used as answer categories
*/
import Logger from '../logger/logger'
const logger = new Logger('CodeListModel', 'Models')

class CodeListModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._name = object._name;
      this._label = object._label;
      this._codes = object._codes;
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      logger.debug('CodeList created with id ', this._id);
      this._name = '';
      this._label = '';
      this._codes = []; // codes : [{"value": 1, "label": "Oui"}, {"value": 2, "label": "Non"}]
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

  get codes() {
    return this._codes;
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

  addCode(code) {
    if (!(typeof code == 'object' &&
          code.hasOwnProperty('value') &&
          code.hasOwnProperty('label'))) {
      throw new Error('The argument must be an object with a label and a value');
    }
    this._categories.push(code);
  }
}

export default CodeListModel;
