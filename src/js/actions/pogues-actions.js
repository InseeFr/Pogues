var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');

var PoguesActions = {
	setLanguage: function (language) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.LANGUAGE_CHANGED,
			language: language
		});
	},
	// Questionnaire list loaded or not from the server
	receiveQuestionnaireList: function(data) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADED,
			questionnaires: data.questionnaires
		});
	},
	loadQuestionnaireList: function () {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.LOAD_QUESTIONNAIRE_LISTE
		})

	},
	loadQuestionnaireListFailed: function(error) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADING_FAILED,
			error: error
		});
	},
	// Questionnaire loaded or not from the server
	receiveQuestionnaire: function(data) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LOADED,
			questionnaire: data.questionnaire
		});
	},
	loadQuestionnaireFailed: function(error) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LOADING_FAILED,
			error: error
		});
	},
	// Questionnaire created in the questionnaire editor
	createQuestionnaire: function(props) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.CREATE_NEW_QUESTIONNAIRE,
			name: props.name,
			label: props.label
		});
	},
	// Questionnaire selected in questionnaire picker
	selectQuestionnaire: function(index) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.SELECT_EXISTING_QUESTIONNAIRE,
			index: index
		});
	},
	// A Component is added with the GenericInput (spec is {sequence, depth, text})
	addComponent: function(spec) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.ADD_COMPONENT,
			spec: spec
		});
	},
	// A Component is made editable
	editComponent: function(id) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.EDIT_COMPONENT,
			id : id
		});
	},
	filterComponents: function(filter) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.FILTER_COMPONENTS,
			filter: filter
		})
	},
	filterQuestionnaires: function(filter) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.FILTER_QUESTIONNAIRES,
			filter: filter
		})
	},
	saveQuestionnaire: function(questionnaire) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.SAVE_QUESTIONNAIRE,
			questionnaire: questionnaire
		});
	}
};

module.exports = PoguesActions;
