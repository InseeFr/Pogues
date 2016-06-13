import {EventEmitter} from 'events';
import assign from 'object-assign';
import {ViewTypes} from '../constants/pogues-constants';
import PoguesDispatcher from '../dispatchers/pogues-dispatcher';
import {ActionTypes} from '../constants/pogues-constants';
var CHANGE_EVENT = "change";
import Logger from '../logger/logger';

var logger = new Logger('AppStatestore', 'Stores');

// TODO quick hack for handling app state, but not satisfactory
var _view = ViewTypes.PICKER;
var _idQuestionnaire = null;


function switchToPicker() {
  _view = ViewTypes.PICKER;
}

function switchToQuestionnaire(id) {
  _view = ViewTypes.QUESTIONNAIRE;
  _idQuestionnaire = id;
}

function switchToConfig() {
  _view = ViewTypes.CONFIG;
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
      questionnaireId: _idQuestionnaire
    }
  },
  emitChange: function() {
    logger.debug('Store emitting change event');
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    logger.debug('Received dispatched payload: ', payload);
    var action = payload.action; // action from HandleViewAction
    switch(action.actionType) {
      case ActionTypes.SWITCH_VIEW_QUESTIONNAIRE:
        switchToQuestionnaire();
        break;
      case ActionTypes.SWITCH_VIEW_PICKER:
        switchToPicker();
        break;
      case ActionTypes.SWITCH_VIEW_CONFIG:
        switchToConfig();
        break;
      default:
        return true;
    }
    logger.debug('Store will emit change, current view is: ', _view);
    AppStateStore.emitChange();
    return true;
  })
});

module.exports = AppStateStore;