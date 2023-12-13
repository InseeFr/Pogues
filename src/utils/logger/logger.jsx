/* eslint-disable no-console */
/*
 Logger utility.
 Manage remote or local logging, levels and namespacing.
 'Beauty is in the eye of the beholder'
 */
import { ENV_TEST } from '../../constants/pogues-constants';
import { getEnvVar } from '../env';

const level = getEnvVar('LOG_LEVEL');
const activeNamespaces = getEnvVar('ACTIVE_NAMESPACES');

const LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

class Logger {
  constructor(moduleName, namespace = 'default') {
    this.moduleName = moduleName;
    this.namespace = namespace;
  }

  static getCurrentLevel() {
    return level;
  }

  static setLevel() {}

  getPrefix() {
    // Keep the trailing space, please
    return `[${this.namespace}][${this.moduleName}]`;
  }

  // ----- Logging methods

  /* Generic logging method that tests the general logging level
   and the active namespace */
  // TODO add remote / local write test
  logWrapper(testLevel, messageArray) {
    if (process.env.NODE_ENV === ENV_TEST) return;

    messageArray.unshift(this.getPrefix());
    if (
      LEVELS[testLevel] >= LEVELS[Logger.getCurrentLevel()] &&
      activeNamespaces.split(',').indexOf(this.namespace) >= 0
    ) {
      switch (testLevel) {
        case 'DEBUG':
          console.log(...messageArray);
          break;
        case 'INFO':
          console.info(...messageArray);
          break;
        case 'WARN':
          console.warn(...messageArray);
          break;
        case 'ERROR':
          console.error(...messageArray);
          break;
        default:
        // no-op
      }
    }
  }

  debug(...messageArray) {
    this.logWrapper('DEBUG', messageArray);
  }

  info(...messageArray) {
    this.logWrapper('INFO', messageArray);
  }

  warn(...messageArray) {
    this.logWrapper('WARN', messageArray);
  }

  error(...messageArray) {
    this.logWrapper('ERROR', messageArray);
  }
}

export default Logger;
