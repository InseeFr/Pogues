var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var _questionnaires = [];
var _currentQuestionnaireIndex = null;

function _setQuestionnaires(questionnaires) {
	_questionnaires = questionnaires;
	console.log('_questionnaires in QuestionnaireListStore is now', _questionnaires);
}

function _removeQuestionnaire(index) {
	_questionnaires.splice(index, 1);
}

function _addQuestionnaire(questionnaire) {
	_questionnaires.push(questionnaire);
}

function _setCurrentQuestionnaire(index) {
	if ((index >= 0) && (index < _questionnaires.length)) _currentQuestionnaireIndex = index;
}

function _createQuestionnaire(name) {
	return {
		name: name,
		creationDate: Date.now()
		// TODO Add other properties
	}
}

var QuestionnaireListStore = assign({}, EventEmitter.prototype, {

	getQuestionnaires: function() {
		return _questionnaires;
	},
	getQuestionnaire: function(index) {
		if (_currentQuestionnaireIndex === null) return null;
		else return _questionnaires[index];
	},
	getCurrentQuestionnaire: function() {
		if (_currentQuestionnaireIndex === null) return null;
		else return _questionnaires[_currentQuestionnaireIndex];
	},
	getCurrentQuestionnaireIndex: function() {
		return _currentQuestionnaireIndex;
	},
	isCurrentQuestionnnaireSelected: function() {
		return (_currentQuestionnaireIndex !== null);
	},
	emitChange: function() {
		console.log('QuestionnaireListStore emitting event', CHANGE_EVENT);
		this.emit(CHANGE_EVENT)
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback)
	},
	dispatcherIndex: PoguesDispatcher.register(function(payload) {
		console.log('QuestionnaireListStore received dispatched payload', payload);
		var action = payload.action;
		switch(action.actionType) {
			case ActionTypes.QUESTIONNAIRE_LIST_LOADED:
				_setQuestionnaires(payload.action.questionnaires);
				break;
			case ActionTypes.SELECT_EXISTING_QUESTIONNAIRE:
				_setCurrentQuestionnaire(payload.action.index);
				break;
			case ActionTypes.SELECT_NEW_QUESTIONNAIRE:
				_addQuestionnaire(_createQuestionnaire(payload.action.name));
				break;
			default:
				return true;
		}
		// If action was dealt with, emit change event
		QuestionnaireListStore.emitChange();
		return true;
	})
})

module.exports = QuestionnaireListStore;