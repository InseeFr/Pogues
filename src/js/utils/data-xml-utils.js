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
