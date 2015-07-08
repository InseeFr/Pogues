/**
A Survey
*/
import { stripLeadingUnderscore } from '../utils/name-utils';

class SurveyModel {
  constructor(object) {
    if (object) {
      this._id = object._id;
      this._agency = object._agency;
      this._name = object._name;
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._agency = 'fr.insee';
      this._name = '';
    }
  }

  serialize() {
    let o = {};
    let fields = Object.keys(this);
    fields.forEach(field => o[stripLeadingUnderscore(field)] = this[stripLeadingUnderscore(field)]);
    return o;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get agency() {
    return this._agency;
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

  set agency(agency) {
    if (typeof agency === 'string') {
      throw new Error('The parameter must be a string');
    }
    this._agency = agency;
  }
}

export default SurveyModel;
