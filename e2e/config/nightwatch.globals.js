module.exports = {
  launch_url: 'http://localhost:3000',
  beforeEach: function(browser, done) {
    // Allow to simulate Auth if front is embedded with BO
    const url = browser.globals.launch_url;
    if (url.indexOf('rmspogfo') > 0) {
      browser
        .url(url)
        .waitForElementVisible('#username')
        .setValue('#username', 'D5WQNO')
        .click('input[type=submit]')
        .waitForElementVisible('#app');
    } else {
      done()
    }
  },
}
