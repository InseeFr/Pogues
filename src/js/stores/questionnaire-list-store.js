var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var EventEmitter = require('events').EventEmitter;
var QuestionnaireModel = require("../models/Questionnaire");
var assign = require('object-assign');

var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var _questionnaires = [];

function _setQuestionnaires(questionnaires) {
	_questionnaires = questionnaires;
	console.log('_questionnaires in QuestionnaireListStore is now', _questionnaires);
}

function _removeQuestionnaire(index) {
	_questionnaires.splice(index, 1);
}

function _addQuestionnaire(questionnaire) {
	//questionnaire.id = 'q' + _questionnaires.length,
	_questionnaires.push(questionnaire);
}

function _createQuestionnaire(name) {
	var _questionnaire = new QuestionnaireModel();
	_questionnaire.name = name;
	// FIXME getName does not work
	console.log('questionnaire-list-store created questionnaire', _questionnaire);
	return _questionnaire;
}

var QuestionnaireListStore = assign({}, EventEmitter.prototype, {

	getQuestionnaires: function() {
		return _questionnaires;
	},
	getQuestionnaire: function (index) {
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
	},
	dispatcherIndex: PoguesDispatcher.register(function(payload) {
		console.log('QuestionnaireListStore received dispatched payload', payload);
		var action = payload.action;
		switch(action.actionType) {
			case ActionTypes.QUESTIONNAIRE_LIST_LOADED:
				_setQuestionnaires(payload.action.questionnaires);
				break;
			case ActionTypes.QUESTIONNAIRE_LIST_LOADING_FAILED:
				_setQuestionnaires(null);
				break;
			case ActionTypes.CREATE_NEW_QUESTIONNAIRE:
				_addQuestionnaire(_createQuestionnaire(payload.action.name));
				break;
			case ActionTypes.LOAD_QUSETIONNAIRE_LIST:
				DataUtils.loadQuestionnaireList();
				break;
			default:
				return true;
		}
		// If action was dealt with, emit change event
		QuestionnaireListStore.emitChange();
		return true;
	})
});

module.exports = QuestionnaireListStore;
var DataUtils = require('../utils/data-utils');