var PoguesActions = require('../actions/pogues-actions');

var DataUtils = {
	// TODO Load data from server source
	// Mock function will return from 0 to 29 questionnaires in 0 to 1 second, and a 1% possibility of error
	loadQuestionnaireList: function() {

		var numberOfQuestionnaires = Math.floor(Math.random() * 30);
		var timeout = Math.random() * 1000;
		var fail = (Math.random() < 0.1);
		console.log('Creating ' + numberOfQuestionnaires + ' questionnaires in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
		setTimeout(function() {
			if (fail) PoguesActions.loadQuestionnaireListFailed();
			else {
				var questionnaires = [];
				for (var index = 0; index <= numberOfQuestionnaires; index++) {
					questionnaires.push({id: 'q' + index, name: 'Questionnaire numéro ' + index});
				}
				var fakeList = {
					questionnaires: questionnaires,
				};
				PoguesActions.receiveQuestionnaireList(fakeList);
			}

		}, timeout);

	}
};

module.exports = DataUtils;