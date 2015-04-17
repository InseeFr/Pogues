var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var ActionTypes = require('../constants/pogues-constants').ActionTypes;
var CHANGE_EVENT = "change";

// TODO quick hack for handling app state, but not satisfactory
var _view = ViewTypes.PICKER;
var _idQuestionnaire = null;
var _idComponent = null;


function switchToPicker() {
  _view = ViewTypes.PICKER;
}

function switchToQuestionnaire(id) {
  _view = ViewTypes.QUESTIONNAIRE;
  _idQuestionnaire = id;
  _idComponent = null;
}

function switchToEdition(id) {
  _view = ViewTypes.EDITION;
  _idComponent = id;
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
  getState: function() {
    //FIXME
    return {
      view: _view,
      componentId: _idComponent,
      questionnaireId: _idQuestionnaire
    }
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
      case ActionTypes.EDIT_COMPONENT:
        switchToEdition(payload.action.id);
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
