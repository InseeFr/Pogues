/**
The class for a Questionnaire
*/
import Sequence from './Sequence.js'
import Survey from './Survey.js'

class Questionnaire extends Sequence {
  constructor(name) {
    super();
    this.survey = new Survey();
  }

  get getSurvey() {
    return this.survey;
  }

  set setSurvey(name) {
    if(!(survey instanceof Survey)) {
      throw new Error('The argument must be a Survey');
    }
    this.survey = survey;
  }
}

export default Questionnaire;
