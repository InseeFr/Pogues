var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require("../models/Questionnaire");
var SequenceModel = require("../models/Sequence");
var DataUtils = require('../utils/data-utils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var QUtils = require('../utils/questionnaire-utils');

var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var _questionnaire = undefined;
var _filter = null;
var _rFilter;

var _modules = [];

function _setQuestionnaireByIndex(index) {
	_questionnaire = QuestionnaireListStore.getQuestionnaire(index);
	console.log('Questionnaire', _questionnaire);
	_questionnaire.modules = [];
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

function _setQuestionnaire(questionnaire) {
	// We must keep id and we can keep name
	_questionnaire.modules = questionnaire.modules;
	console.log('Questionnaire in questionnaire store is now', _questionnaire);
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

/* Mark a component (sequence or question) as editable */
//FIXME refactor the algo
function _setComponentEditable(id) {
	console.log('Component with id ' + id + ' is now editable');
	// First level sequences
	// _questionnaire.children.forEach(function(firstLevelComponent) {
	// 	if (firstLevelComponent.id === id) {
	// 		console.log('Found the component !');
	// 		return;
	// 		}
	// 	// Second level sequences, could be questions
	// 	else firstLevelComponent.children.forEach(function(secondLevelComponent){
	// 		if (secondLevelComponent.id === id) {
	// 			console.log('Found the component !');
	// 			return;
	// 			}
	// 		// Third level, that is questions  :)
	// 		if (secondLevelComponent.children != undefined &&
	// 			  secondLevelComponent.children.length > 0) {
	//
	// 				secondLevelComponent.children.forEach(function(thirdLevelComponent){
	// 					if (thirdLevelComponent.id === id) { console.log('Found the component !');return;}
	// 				});
	// 		  }
	// 	})
	// });
	QUtils.searchAndApply(_questionnaire.children,'id', id, function(e) { console.log('ping ' + e.id + ' !'); });
}

var QuestionnaireStore = assign({}, EventEmitter.prototype, {
	getQuestionnaire: function() {
		return _questionnaire;
	},
	getFilter: function () {
		return _rFilter;
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
			case ActionTypes.ADD_SEQUENCE:
				_addSequence(payload.action.name);
				break;
			case ActionTypes.SELECT_EXISTING_QUESTIONNAIRE:
				_setQuestionnaireByIndex(payload.action.index);
				DataUtils.loadDeepQuestionnaire(payload.action.index); //loadQuestionnaire() for shallow questionnaire
				break;
			case ActionTypes.CREATE_NEW_QUESTIONNAIRE:
				_questionnaire = _createQuestionnaire(payload.action.name);
				break;
			case ActionTypes.QUESTIONNAIRE_LOADED:
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
				QuestionnaireStore.emitChange();
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
