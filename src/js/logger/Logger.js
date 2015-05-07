/*
Logger utility.
Manage remote or local logging, levels and namespacing.
'Beauty is in the eye of the beholder'
*/
var Config = require('../config/config');

const DEFAULT_LEVEL = 'DEBUG';

const LEVELS = {
  'DEBUG' : 0,
  'INFO' : 1,
  'WARN' : 2,
  'ERROR' : 3
};

class Logger {
  constructor(moduleName, namespace='default') {
    this.moduleName = moduleName;
    this.namespace = namespace;
  }

  getPrefix() {
    return '['+ this.namespace +']['+ this.moduleName +'] ';
  }

  getCurrentLevel() {
    return Config.log.level;
  }

  setLevel() {}

  // Logging methods

  debug(message) {
    // TODO add active namespace test
    if(LEVELS['DEBUG'] >= LEVELS[this.getCurrentLevel()] ) {
      // TODO add remote / local write test
      console.log(this.getPrefix() + message);
    }
  }

}

export default Logger;
