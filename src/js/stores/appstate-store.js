var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var ActionTypes = require('../constants/pogues-constants').ActionTypes;
var CHANGE_EVENT = "change";

var _view = ViewTypes.PICKER;

function switchToPicker() {
  _view = ViewTypes.PICKER;
}

function switchToQuestionnaire() {
  _view = ViewTypes.QUESTIONNAIRE;
}



function inPicker() {
  return _view === ViewTypes.PICKER;
}

function inQuestionnaire() {
  return _view === ViewTypes.QUESTIONNAIRE;
}


var AppStateStore = assign({}, EventEmitter.prototype, {
  getView: function() {
    return _view;
  },
  emitChange: function() {
    console.log('AppStateStore emitting event', CHANGE_EVENT);
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    console.log('AppStateStore received dispatched payload', payload);
    var action = payload.action; // action from HandleViewAction
    switch(action.actionType) {
      case ActionTypes.SWITCH_VIEW_QUESTIONNAIRE:
        switchToQuestionnaire();
        break;
      case ActionTypes.SWITCH_VIEW_PICKER:
        switchToPicker();
        break;
      default:
        return true;
    }
    console.log('AppStateStore will emit change, current view is', _view);
    AppStateStore.emitChange();
    return true;
  })
});


module.exports = AppStateStore;
