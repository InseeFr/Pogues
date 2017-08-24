const config = require('../nightwatch.conf.js');
const questionnairePage = require('./po/questionnaire');

module.exports = {
  'Application assert Title': browser => {
    browser
      .url("http://localhost:3000/#/questionnaire/fr.insee-POPO-QPO-DOC")
      .waitForElementVisible('body')
      .click(questionnairePage.VoirLeDetailButton)
      .waitForElementVisible(questionnairePage.QuestionnaireModalLabelInput)
      .clearValue(questionnairePage.QuestionnaireModalLabelInput)
      .setValue(questionnairePage.QuestionnaireModalLabelInput, 'nightwatch')
      .click(questionnairePage.QuestionnaireModalSubmit)
      .waitForElementNotPresent(questionnairePage.QuestionnaireModalLabelInput)
      .assert.containsText(questionnairePage.QuestionnaireTitle, 'nightwatch')
      .end()
  },
};
