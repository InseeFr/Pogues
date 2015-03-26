/**
The class for a Questionnaire
*/
import Sequence from './Sequence.js';
import Survey from './Survey.js';

class Questionnaire extends Sequence {
  constructor() {
    super();
    this._survey = new Survey();
  }

  get survey() {
    return this._survey;
  }

  set survey(survey) {
    if (!(survey instanceof Survey)) {
      throw new Error('The argument must be a Survey');
    }
    this._survey = survey;
  }
}

export default Questionnaire;
