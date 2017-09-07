const questionnairePage = require('./../po/questionnaire');

module.exports = {
  '@disabled': true,
  'Should update the title of a questionnaire': browser => {
    browser
      .url(`${browser.globals.launch_url}`)
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
