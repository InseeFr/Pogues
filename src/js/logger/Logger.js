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
    // Keep the trailing space, please
    return '['+ this.namespace +']['+ this.moduleName +'] ';
  }

  getCurrentLevel() {
    return Config.log.level;
  }

  setLevel() {}

  //----- Logging methods

  /* Generic logging method that tests the general logging level
  and the active namespace*/
  // TODO add remote / local write test
  logWrapper(testLevel,message) {
    if(LEVELS[testLevel] >= LEVELS[this.getCurrentLevel()]
      && Config.log.activeNamespaces.indexOf(this.namespace) >= 0) {
      switch(testLevel) {
        case 'DEBUG':
          console.log(this.getPrefix() + message);
          break;
        case 'INFO':
          console.info(this.getPrefix() + message);
          break;
        case 'WARN':
          console.warn(this.getPrefix() + message);
          break;
        case 'ERROR':
          console.error(this.getPrefix() + message);
          break
        default:
          //no-op
      }

    }
  }

  // FIXME use 'log' instead ? Or support both ?
  debug(message) {
    this.logWrapper('DEBUG', message);
  }

  info(message) {
    this.logWrapper('INFO', message);
  }

  warn(message) {
    this.logWrapper('WARN', message);
  }

  error(message) {
    this.logWrapper('ERROR', message);
  }

}

export default Logger;
