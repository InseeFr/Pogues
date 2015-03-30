var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var DataUtils = require('../utils/data-utils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var _questionnaire = null;
var _modules = [];

function _setQuestionnaireByIndex(index) {
	_questionnaire = QuestionnaireListStore.getQuestionnaire(index);
	console.log('Questionnaire', _questionnaire);
	_questionnaire.modules = [];
}

function _setQuestionnaire(questionnaire) {
	// We must keep id and we can keep name
	_questionnaire.modules = questionnaire.modules;
	console.log('Questionnaire in questionnaire store is now', _questionnaire);
}

function _createQuestionnaire(name) {
	return {
		name: name,
		creationDate: Date.now(),
		modules: []
		// TODO Add other properties
	};
}

function _removeModule(index) {
	_questionnaire.modules.splice(index, 1);
}

function _addModule(name) {
	_questionnaire.modules.push(_createModule(name));
}

function _createModule(name) {
	return {
		name: name
		// TODO Add other properties
	};
}

var QuestionnaireStore = assign({}, EventEmitter.prototype, {
	getQuestionnaire: function() {
		return _questionnaire;
	},
	emitChange: function() {
		console.log('QuestionnaireStore emitting event', CHANGE_EVENT);
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	dispatcherIndex: PoguesDispatcher.register(function(payload) {
		console.log('QuestionnaireStore received dispatched payload', payload);
		var action = payload.action; // action from HandleViewAction
		switch(action.actionType) {
			case ActionTypes.CREATE_MODULE:
				_addModule(payload.action.name);
				break;
			case ActionTypes.SELECT_EXISTING_QUESTIONNAIRE:
				_setQuestionnaireByIndex(payload.action.index);
				DataUtils.loadQuestionnaire(payload.action.index);
				break;
			case ActionTypes.CREATE_NEW_QUESTIONNAIRE:
				_questionnaire = _createQuestionnaire(payload.action.name);
				break;
			case ActionTypes.QUESTIONNAIRE_LOADED:
				_setQuestionnaire(payload.action.questionnaire);
				break;
			default:
				return true;
		}
		console.log('QuestionnaireStore will emit change, questionnaire is', _questionnaire);
		QuestionnaireStore.emitChange();
		return true;
	})
});

module.exports = QuestionnaireStore;