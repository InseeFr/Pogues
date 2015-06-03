var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require('../models/Questionnaire');
var SequenceModel = require('../models/Sequence');
var QuestionModel = require('../models/Question');
var ResponseModel = require('../models/Response');
var DeclarationModel = require('../models/Declaration');
var ExpressionModel = require('../models/Expression');
var ControlModel = require('../models/Control');
var GoToModel = require('../models/GoTo');
var Config = require('../stores/config-store').getConfig();
var ModelConstants = require('../models/model-constants');
var request = require('superagent');
var TextDatatypeModel = require('../models/TextDatatype');
var DateDatatypeModel = require('../models/DateDatatype');
var NumericDatatypeModel = require('../models/NumericDatatype');

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
