/*
Logger utility.
Manage remote or local logging, levels and namespacing.
'Beauty is in the eye of the beholder'
*/
import Config from '../config/config';

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
    return '['+ this.namespace +']['+ this.moduleName +']';
  }

  getCurrentLevel() {
    return Config.log.level;
  }

  setLevel() {}

  //----- Logging methods

  /* Generic logging method that tests the general logging level
  and the active namespace*/
  // TODO add remote / local write test
  logWrapper(testLevel, messageArray) {
    messageArray.unshift(this.getPrefix());
    if(LEVELS[testLevel] >= LEVELS[this.getCurrentLevel()]
      && Config.log.activeNamespaces.indexOf(this.namespace) >= 0) {
      switch(testLevel) {
        case 'DEBUG':
          console.log.apply(console, messageArray);
          break;
        case 'INFO':
          console.info.apply(console, messageArray);
          break;
        case 'WARN':
          console.warn.apply(console, messageArray);
          break;
        case 'ERROR':
          console.error.apply(console, messageArray);
          break
        default:
          //no-op
      }

    }
  }

  debug() {
    var messageArray = Array.prototype.slice.call(arguments);
    this.logWrapper('DEBUG', messageArray);
  }

  info() {
    var messageArray = Array.prototype.slice.call(arguments);
    this.logWrapper('INFO', messageArray);
  }

  warn() {
    var messageArray = Array.prototype.slice.call(arguments);
    this.logWrapper('WARN', messageArray);
  }

  error() {
    var messageArray = Array.prototype.slice.call(arguments);
    this.logWrapper('ERROR', messageArray);
  }

}

export default Logger;
