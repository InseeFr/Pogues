const genericInput = require('./po/generic-input');
const editQuestion = require('./po/edit-question');

module.exports = {
  'Should close the model if Cancel is clicked': browser => {
    browser
      .url(`${browser.globals.launch_url}/#/questionnaire/fr.insee-POPO-QPO-DOC`)
      .waitForElementVisible('body')
      .click(genericInput.AddQuestion)
      .waitForElementVisible(editQuestion.Tabs)
      .click(editQuestion.CancelButton)
      .waitForElementNotPresent(editQuestion.Tabs)
      .end();
  },
  'Should show declaration panel': browser => {
    browser
      .url(`${browser.globals.launch_url}/#/questionnaire/fr.insee-POPO-QPO-DOC`)
      .waitForElementVisible('body')
      .click(genericInput.AddQuestion)
      .waitForElementVisible(editQuestion.Tabs)
      .click(editQuestion.DeclarationTab)
      .assert.cssClassPresent(editQuestion.DeclarationContent, 'active')
      .end();
  },
};
