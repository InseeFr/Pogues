// require('env2')('.env'); // optionally store youre Evironment Variables in .env
const seleniumDownload = require('selenium-download');

const SCREENSHOT_PATH = './screenshots/';
const BINPATH = './node_modules/nightwatch/bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  src_folders: [
    'e2e', // Where you are storing your Nightwatch e2e tests
  ],
  output_folder: './reports, // reports (test outcome) output by nightwatch',
  selenium: {
    // downloaded by selenium-download module (see readme)
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: './node_modules/nightwatch/bin/selenium.jar',
    host: '127.0.0.1',
    port: 4444, // standard selenium port
    cli_args: {
      // chromedriver is downloaded by selenium-download (see readme)
      'webdriver.chrome.driver': './node_modules/nightwatch/bin/chromedriver',
    },
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost:3000', // were testing a Public or staging site on Saucelabs
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      screenshots: {
        enabled: false, // save screenshots to this directory (excluded by .gitignore)
        path: SCREENSHOT_PATH,
      },
      username: "${SAUCE_USERNAME}", // if you want to use Saucelabs remember to
      access_key: "${SAUCE_ACCESS_KEY}",
      globals: {
        waitForConditionTimeout: 10000, // wait for content on the page before continuing
      },
    },
    local: {
      launch_url: 'http://localhost:3000',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      silent: true,
      screenshots: {
        enabled: false, // save screenshots taken here
        path: SCREENSHOT_PATH,
      }, // this allows us to control the
      globals: {
        waitForConditionTimeout: 15000, // on localhost sometimes internet is slow so wait...
      },
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    chrome: {
      // your local Chrome browser (chromedriver)
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(`${BINPATH}selenium.jar`, (err, stat) => {
  // got it?
  if (err || !stat || stat.size < 1) {
    seleniumDownload.ensure(BINPATH, error => {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

function padLeft(count) {
  // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? `0${count}` : count.toString();
}

let FILECOUNT = 0; // "global" screenshot file count
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
  return `${SCREENSHOT_PATH}${metadata}_${padLeft((FILECOUNT += 1))}_`;
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
