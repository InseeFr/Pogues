/**
The class for a Questionnaire
*/
class Questionnaire {
  constructor(name) {
    // TODO
    this.name = name;
    this.sequences = [];
  }

  get getName() {
    return this.name;
  }
}

export default Questionnaire;
