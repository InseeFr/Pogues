/**
The class for a Questionnaire
*/
import SequenceModel from './Sequence.js';
import SurveyModel from './Survey.js';

class QuestionnaireModel extends SequenceModel {
  constructor() {
    super();
    this._survey = new SurveyModel();
  }

  get survey() {
    return this._survey;
  }

  set survey(survey) {
    if (!(survey instanceof SurveyModel)) {
      throw new Error('The argument must be a Survey');
    }
    this._survey = survey;
  }
}

export default QuestionnaireModel;
