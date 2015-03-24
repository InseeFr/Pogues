/**
A Survey
*/
class Survey {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.agency = 'fr.insee';
    this.name = '';
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getAgency() {
    return this.name;
  }

  // TODO do we need a setter for id?

  set setName(name) {
    if(!(typeof name === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.name = name;
  }

  set setAgency(agency) {
    if(!(typeof agency === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.agency = agency;
  }
}

export default Survey;
