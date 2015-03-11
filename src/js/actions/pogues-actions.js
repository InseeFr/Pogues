var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');

var PoguesActions = {

	// Questionnaire list loaded from the server
	receiveQuestionnaireList: function(data) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADED,
			questionnaires: data.questionnaires
		})
	},
	loadQuestionnaireListFailed: function(error) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADING_FAILED,
			error: error
		})
	},
	// Questionnaire created in the questionnaire editor
	createQuestionnaire: function(name) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.CREATE_NEW_QUESTIONNAIRE,
			name: name
		})
	},
	// Questionnaire selected in questionnaire picker
	selectQuestionnaire: function(index) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.SELECT_EXISTING_QUESTIONNAIRE,
			index: index
		})
	},
	// Questionnaire selected in questionnaire picker
	createModule: function(name) {
		PoguesDispatcher.handleViewAction({
			actionType: PoguesConstants.ActionTypes.CREATE_MODULE,
			name: name
		})
	}
};

module.exports = PoguesActions;
