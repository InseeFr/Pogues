const config = require('../nightwatch.conf.js');

module.exports = {
  'Application assert Title': browser => {
    browser
      .init()
      .waitForElementVisible('body')
      .assert.title('Pogues')
      .end()
  },
};
