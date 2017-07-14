const config = require('../nightwatch.conf.js');

module.exports = {
  'Application assert Title': browser => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible('body')
      .assert.title('Pogues')
      .end()
  },
};
