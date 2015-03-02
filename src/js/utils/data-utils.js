var PoguesActions = require('../actions/pogues-actions');

var DataUtils = {
	// TODO Load data from server source
	loadQuestionnaires: function() {
		var fakeData = {
			questionnaires: [
				{id: 'q1', name: 'Mon premier questionnaire'},
				{id: 'q2', name: 'Mon deuxième questionnaire'},
				{id: 'q3', name: 'Mon troisième questionnaire'}
			]
		};
		PoguesActions.receiveQuestionnaires(fakeData);
	}
};

module.exports = DataUtils;