import PoguesActions from '../actions/pogues-actions';
import QuestionnaireListStore from '../stores/questionnaire-list-store';;
import QuestionnaireModel from '../models/questionnaire';
import SequenceModel from '../models/sequence';
import QuestionModel from '../models/question';
import ResponseModel from '../models/response';
import DeclarationModel from '../models/declaration';
import ExpressionModel from '../models/expression';
import ControlModel from '../models/control';
import GoToModel from '../models/go-to';
import {getConfig} from '../stores/config-store';
var Config = getConfig()
import ModelConstants from '../models/model-constants';
import request from 'superagent';
import TextDatatypeModel from '../models/text-datatype';
import DateDatatypeModel from '../models/date-datatype';
import NumericDatatypeModel from '../models/numeric-datatype';

var DataXMLUtils = {

  questionnaireToDOMDocument: function(questionnaire) {
    var domDocument = document.implementation.createDocument ('http://xml.insee.fr/Schema/outils', 'questionnaire', null);
    var questionnaireElement = domDocument.documentElement;
    questionnaireElement.setAttribute('id', questionnaire.id);
    var surveyElement = document.createElement('Survey');
    surveyElement.setAttribute('id', questionnaire.survey.id);
    surveyElement.setAttribute('agency', questionnaire.survey.agency);
    var surveyNameElement = document.createElement('Name');
    surveyNameElement.textContent = questionnaire.survey.name;
    surveyElement.appendChild(surveyNameElement);
    questionnaireElement.appendChild(surveyElement);
    return domDocument;
  },

  questionnaireToXMLString: function(questionnaire) {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(this.questionnaireToDOMDocument(questionnaire));
  }

};

module.exports = DataXMLUtils;
