var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');

var PoguesActions = {

	// Questionnaire list loaded or not from the server
	receiveQuestionnaireList: function(data) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADED,
			questionnaires: data.questionnaires
		});
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
	createQuestionnaire: function(name) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.CREATE_NEW_QUESTIONNAIRE,
			name: name
		});
	},
	// Questionnaire selected in questionnaire picker
	selectQuestionnaire: function(index) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.SELECT_EXISTING_QUESTIONNAIRE,
			index: index
		});
	},
	// TODO Rest of the actions
	addSequence: function(name) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.ADD_SEQUENCE,
			name: name
		});
	},
	// A Component is made editable
	editComponent: function(id) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.EDIT_COMPONENT,
			id : id
		});
	}
};

module.exports = PoguesActions;
