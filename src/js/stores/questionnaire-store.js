var EventEmitter = require('events').EventEmitter;
var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require("../models/questionnaire");
var SequenceModel = require("../models/sequence");
var DataUtils = require('../utils/data-utils');
var assign = require('object-assign');
var QUtils = require('../utils/questionnaire-utils');
var Logger = require('../logger/logger');
// FIXME CHANGE_EVENT should be a constant
var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var logger = new Logger('QuestionnaireStore', 'Stores');

var _questionnaire;
var _filter = null;
var _rFilter;
var _publishURL = '';
var _publishTimestamp = null;

function _setQuestionnaireById(id) {

  DataUtils.getQuestionnaire(id);
  logger.debug('Setting questionnaire by id ' + id + ', questionnaire is: ', _questionnaire);
  // FIXME nothing is done with the questionnaire in param.
  //setTimeout(PoguesActions.receiveQuestionnaire.bind(null, _questionnaire), 0);
}
/**
 * Set current filter for the questionnaire
 * @param {String} filter Components labels will be test against filter
 */
function _setFilter(filter) {
  _filter = filter;
  // an empty string or null, no filtering
  _rFilter = filter ? new RegExp(filter) : null;
}

/**
 * After sending a questionnaire to publishing, we store
 * the publishing URL returned by the server in the store.
 * TODO each time we load a questionnaire in the store we must
 * erase that property
 */
function _setPublicationURL(url) {
  logger.debug('Setting publication URL in store.', url);
  _publishURL = url;
  var date = new Date();
  _publishTimestamp = date.getHours() + ':' + date.getMinutes() + ':'  + date.getSeconds();
}

function _setQuestionnaire(questionnaire) {
  // We must keep id and we can keep name
  _questionnaire = questionnaire;
  logger.debug('Setting questionnaire in store, questionnaire is now: ', _questionnaire);
}

function _createQuestionnaire(name) {
  var questionnaire = new QuestionnaireModel();
  questionnaire.name = name;
  return questionnaire;
}

function _addSequence(name) {
  var child = new SequenceModel();
  child.name = name;
  _questionnaire.addChild(child);
}

function _addComponent(spec) {
  logger.debug('Adding a component to the questionnaire.');
  QUtils.appendComponent(_questionnaire, spec.sequence, spec.depth, spec.text);
}

// TODO Check if this is used
/* Mark a component (sequence or question) as editable */
function _setComponentEditable(id) {
  logger.debug('Component with id ' + id + ' is now editable');
  QUtils.searchAndApply(_questionnaire.children,'id', id, function(e) {}); // Passing empty function
}

function _updateId(newId, oldId){
  // update id only if we are still working on the current questionnaire
  if (oldId !== _questionnaire.id) return;
}

var QuestionnaireStore = assign({}, EventEmitter.prototype, {
  getQuestionnaire: function() {
    return _questionnaire;
  },
  getFilter: function () {
    return _rFilter;
  },
  getPublicationURL: function() {
    return _publishURL;
  },
  getPublicationTimestamp: function() {
    return _publishTimestamp;
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
      case ActionTypes.RECEIVE_NEW_ID_FROM_SERVER:
        // no action, but we want to emit change
        break;
      case ActionTypes.ADD_COMPONENT:
        //_addSequence(payload.action.spec.text);
        _addComponent(payload.action.spec);
        break;
      case ActionTypes.SELECT_QUESTIONNAIRE:
        _setQuestionnaireById(payload.action.id);
        break;
      case ActionTypes.RECEIVE_QUESTIONNAIRE:
        _setQuestionnaire(payload.action.questionnaire);
        break;
      case ActionTypes.QUESTIONNAIRE_LOADING_FAILED:
        _questionnaire = null;
        break;
      case ActionTypes.EDIT_COMPONENT:
        _setComponentEditable(payload.action.id);
        break;
      case ActionTypes.FILTER_COMPONENTS:
        _setFilter(payload.action.filter);
        break;
      case ActionTypes.SAVE_QUESTIONNAIRE:
        DataUtils.saveQuestionnaire(payload.action.questionnaire);
        break;
      case ActionTypes.EDIT_QUESTIONNAIRE:
        _questionnaire[payload.action.k] = payload.action.v;
        break;
      case ActionTypes.PUBLISH_QUESTIONNAIRE:
        logger.debug('Handling PUBLISH_QUESTIONNAIRE action.');
        DataUtils.publishQuestionnaire(payload.action.questionnaire);
        break;
      case ActionTypes.GET_PUBLICATION_URL:
        logger.debug('Handling GET_PUBLICATION_URL action.');
        _setPublicationURL(payload.action.url);
        break;
      case ActionTypes.ADD_CODE_LIST:
        logger.debug('Handling ' + action.actionType);
        _questionnaire.addCodeList(action.codeList);
      case ActionTypes.ADD_GOTO:
        logger.debug('Handling' + action.actionType);
      case ActionTypes.DELETE_GOTO:
        logger.debug('Handling' + action.actionType);
      default:
        //no op;
    }
    logger.debug('Store will emit change, questionnaire is: ', _questionnaire);
    QuestionnaireStore.emitChange();
    return true;
  })
});

module.exports = QuestionnaireStore;
