import {EventEmitter} from 'events';
import assign from 'object-assign';
import {ViewTypes} from '../constants/pogues-constants';
import PoguesDispatcher from '../dispatchers/pogues-dispatcher';
import {ActionTypes} from '../constants/pogues-constants';
var CHANGE_EVENT = "change";
import Logger from '../logger/logger';
var logger = new Logger('Configstore', 'Stores');

import _config from '../config/config'

function changeConfig(config) {
  // TODO (cannot change a module)
  //_config = config
}

var ConfigStore = assign({}, EventEmitter.prototype, {
  getConfig: function() {
    return _config
  },
  emitChange: function() {
    logger.debug('ConfigStore emitting event', CHANGE_EVENT);
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    logger.debug('ConfigStore received dispatched payload', payload);
    var action = payload.action; // action from HandleViewAction
    switch(action.actionType) {
      case ActionTypes.CHANGE_CONFIG:
        changeConfig(action.config);
        break;
      default:
        return true;
    }
    logger.debug('ConfigStore will emit change, current config is', _config);
    ConfigStore.emitChange();
    return true;
  })
});


module.exports = ConfigStore;
