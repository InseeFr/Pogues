var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');

var PoguesActions = {

	// Questionnaire list loaded from the server
	receiveQuestionnaires: function(data) {
		PoguesDispatcher.handleServerAction({
			actionType: PoguesConstants.ActionTypes.QUESTIONNAIRES_LOADED,
			questionnaires: data.questionnaires
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
