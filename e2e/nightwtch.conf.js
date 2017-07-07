const SCREENSHOT_PATH = './screenshots/';
const BINPATH = './node_modules/nightwatch/bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  src_folders: ['e2e'],
  output_folder: './reports', // reports (test outcome) output by nightwatch
  selenium: {
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: './node_modules/nightwatch/bin/selenium.jar',
    host: '127.0.0.1',
    port: 4444, // standard selenium port
    cli_args: {
      'webdriver.chrome.driver': './node_modules/nightwatch/bin/chromedriver'
    },
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: true, // if you want to keep screenshots
        path: './screenshots',
      },
      globals: {
        waitForConditionTimeout: 5000,
      },
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true
      },
    },
  },
}

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(`${BINPATH}selenium.jar`, (err, stat) => {
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, error => {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

function padLeft(count) {
  return count < 10 ? `0${count}` : count.toString();
}

const FILECOUNT = 0; // 'global' screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  const a = browser.options.desiredCapabilities;
  const meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  const metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
