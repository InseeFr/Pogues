const config = require('../nightwatch.conf.js');

module.exports = {
  'Application assert Title': browser => {
    browser
      .url("http://localhost:3000/#/questionnaire/fr.insee-POPO-QPO-DOC")
      .waitForElementVisible('body')
      .click('#questionnaire-head button:nth-child(1)')
      .waitForElementVisible('#input-label')
      .clearValue('.popup-body #input-label')
      .setValue('.popup-body #input-label', 'nightwatch')
      .click('.popup-body button[type=submit]')
      .waitForElementNotPresent('#input-label')
      .assert.containsText('h4', 'nightwatch')
      .end()
  },
};
