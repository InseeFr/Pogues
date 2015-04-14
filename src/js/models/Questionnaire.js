/**
The class for a Questionnaire
*/
import SequenceModel from './Sequence.js';
import SurveyModel from './Survey.js';

class QuestionnaireModel extends SequenceModel {
  constructor() {
    super();
    this._agency = 'fr.insee';
    // This is temporary
    var popoSurvey = new SurveyModel();
    popoSurvey.name = 'POPO';
    this._survey = popoSurvey;
  }

  get agency() {
    return this._agency;
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

  set agency(agency) {
    if (typeof agency === 'string') {
      throw new Error('The parameter must be a string');
    }
    this._agency = agency;
  }
}

export default QuestionnaireModel;
