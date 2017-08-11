const config = require('../nightwatch.conf.js');

module.exports = {
  'Application assert Title': browser => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible('body')
      .assert.title('Pogues')
      .end()
  },
  'Home page fetch wip questionnaires': browser => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible('.home-questionnaires')
      .assert.containsText('.home-questionnaires h4', 'Stamp : FAKEPERMISSION')
      .end()
  },
};
