var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var ActionTypes = require('../constants/pogues-constants').ActionTypes;
var CHANGE_EVENT = "change";
var Logger = require('../logger/Logger');
var logger = new Logger('ConfigStore', 'Stores');

var _config = require('../config/config')

function changeConfig(config) {
  _config = config
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
