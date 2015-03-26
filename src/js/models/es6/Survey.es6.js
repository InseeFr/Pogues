/**
A Survey
*/
class Survey {
  constructor() {
    this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._agency = 'fr.insee';
    this._name = '';
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

  // TODO do we need a setter for id?

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

export default Survey;
