var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var EventEmitter = require('events').EventEmitter;
var QuestionnaireModel = require("../models/Questionnaire");
var assign = require('object-assign');
var Config = require('../config/config');
var Utils = require('../utils/data-utils');

var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var _questionnaires = {};
// TODO think about using a collection of recently created
// questionnaires which to need to be created on server
var _newQuestionnaires = {};

function _setQuestionnaires(questionnaires) {
    _questionnaires = questionnaires;
    console.log('_questionnaires in QuestionnaireListStore is now', _questionnaires);
}

function _removeQuestionnaire(id) {
    delete _questionnaires[id];
}

function _addQuestionnaire(questionnaire) {
        //questionnaire.id = 'q' + _questionnaires.length,
        _questionnaires[questionnaire.id] = questionnaire;
    }

function _addNewQuestionnaire(questionnaire) {
        //questionnaire.id = 'q' + _questionnaires.length,
        _newQuestionnaires[questionnaire.id] = questionnaire;
    }

/*
/*
Call when a questionnaire has been posted
The server returns a definitive id for the questionnaire
 */
function _updateId(oldId, newId) {
    var questionnaire;
    // FIXME maybe not a good idea, we could try to
    // wait for the server response before creating
    // the quesionnaire (pessimistic approach)
    if (oldId in _newQuestionnaires) {
        questionnaire = _newQuestionnaires[oldId];
        questionnaire.id = newId;
        _questionnaires[newId] = questionnaire;
        delete _newQuestionnaires[oldId];
    }
}

function _createQuestionnaireLocal(name, label) {
    var _questionnaire = new QuestionnaireModel();
    _questionnaire.name = name;
    _questionnaire.label = label;
    // mock : populate questionnaire
    // FIXME remove when not needed anymore
    if (!Config.remote) {
      Utils.populateFakeQuestionnaire(_questionnaire);
    }
    // FIXME getName does not work
    console.log('questionnaire-list-store created questionnaire', _questionnaire);
    setTimeout(PoguesActions.selectQuestionnaire.bind(null, _questionnaire), 0);
    setTimeout(PoguesActions.createQuestionnaireDistant.bind(null, _questionnaire), 0);
    return _questionnaire;
}

function _createQuestionnaireDistant(questionnaire){
    Utils.createQuestionnaireDistant(questionnaire);
  return questionnaire;
}


var dispatcherIndex = PoguesDispatcher.register(function(payload) {
    console.log('QuestionnaireListStore received dispatched payload', payload);
    var action = payload.action;
    var questionnaire;
    switch (action.actionType) {
        case ActionTypes.QUESTIONNAIRE_LIST_LOADED:
            _setQuestionnaires(payload.action.questionnaires);
            break;
        case ActionTypes.QUESTIONNAIRE_LIST_LOADING_FAILED:
            _setQuestionnaires(null);
            break;
        case ActionTypes.LOAD_QUSETIONNAIRE_LIST:
            Utils.getQuestionnaireList();
            break;
        case ActionTypes.CREATE_QUESTIONNAIRE_LOCAL:
            questionnaire = _createQuestionnaireLocal(payload.action.name, payload.action.label);
            _addNewQuestionnaire(questionnaire);
            break;
        case ActionTypes.CREATE_QUESTIONNAIRE_DISTANT:
            _createQuestionnaireDistant(payload.action.questionnaire);
            break;
        case ActionTypes.RECEIVE_NEW_ID_FROM_SERVER:
            _updateId(payload.action.oldId, payload.action.newId);
            break;
        default:
            return true;
    }
    // If action was dealt with, emit change event
    QuestionnaireListStore.emitChange();
    return true;
})

var QuestionnaireListStore = assign({}, EventEmitter.prototype, {

    getQuestionnaires: function() {
        return _questionnaires;
    },
    getQuestionnaire: function(index) {
        return _questionnaires[index];
    },
    emitChange: function() {
        console.log('QuestionnaireListStore emitting event', CHANGE_EVENT);
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

module.exports = QuestionnaireListStore;
