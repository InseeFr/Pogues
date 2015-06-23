var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require('../models/questionnaire');
var SequenceModel = require('../models/sequence');
var QuestionModel = require('../models/question');
var ResponseModel = require('../models/response');
var DeclarationModel = require('../models/declaration');
var ExpressionModel = require('../models/expression');
var ControlModel = require('../models/control');
var GoToModel = require('../models/go-to');
var Config = require('../stores/config-store').getConfig();
var ModelConstants = require('../models/model-constants');
var request = require('superagent');
var TextDatatypeModel = require('../models/text-datatype');
var DateDatatypeModel = require('../models/data-datatype');
var NumericDatatypeModel = require('../models/numeric-datatype');

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
