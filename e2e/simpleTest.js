module.exports = {
  'Application assert Title': browser => {
    browser
      .url(browser.globals.launch_url)
      .waitForElementVisible('body')
      .assert.title('Pogues')
      .end();
  },
  'Home page fetch wip questionnaires': browser => {
    browser
      .url(browser.globals.launch_url)
      .waitForElementVisible('.home-questionnaires')
      .assert.containsText('.home-questionnaires h4', 'FAKEPERMISSION')
      .end();
  }
};
