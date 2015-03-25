var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');

var DataUtils = {
	// TODO Load data from server source
	// Mock function will return from 0 to 29 questionnaires in 0 to 5 seconds, and a 10% possibility of error
	loadQuestionnaireList: function() {

		var numberOfQuestionnaires = Math.floor(Math.random() * 30);
		var timeout = Math.random() * 5000;
		var fail = (Math.random() < 0.1);
		console.log('Creating ' + numberOfQuestionnaires + ' questionnaires in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
		setTimeout(function() {
			if (fail) PoguesActions.loadQuestionnaireListFailed();
			else {
				var questionnaires = [];
				for (var index = 1; index <= numberOfQuestionnaires; index++) {
					questionnaires.push({id: 'q' + index, name: 'Questionnaire numéro ' + index});
				}
				var fakeList = {
					questionnaires: questionnaires
				};
				PoguesActions.receiveQuestionnaireList(fakeList);
			}

		}, timeout);
	},
	// Mock function will return a questionnaire with from 1 to 10 modules containing 1 to 5 questions in 0 to 1 second, and a 5% possibility of error
	loadQuestionnaire: function(index) {

		var numberOfModules = Math.floor(Math.random() * 10);
		var timeout = Math.random() * 1000;
		var fail = (Math.random() < 0.05);
		var questionnaire = QuestionnaireListStore.getCurrentQuestionnaire();
		console.log('Creating ' + numberOfModules + ' modules in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
		setTimeout(function() {
			if (fail) PoguesActions.loadQuestionnaireFailed();
			else {
				var modules = [];
				for (var moduleIndex = 1; moduleIndex <= numberOfModules; moduleIndex++) {
					var numberOfQuestions = Math.floor(Math.random() * 5);
					var questions = [];
					for (var questionIndex = 1; moduleIndex <= numberOfQuestions; moduleIndex++) {
						var questionNumber = moduleIndex * 10 + questionIndex;
						questions.push({id: 'q' + questionNumber, name: 'Question numéro ' + questionNumber, text: 'Énoncé de la question numéro ' + questionNumber});
					}
					modules.push({id: 'm' + moduleIndex, name: 'Module numéro ' + moduleIndex, questions: questions});
				}
				questionnaire.modules = modules;
				var fakeQuestionnaire = {
					questionnaire: questionnaire
				};
				console.log('DataUtils.loadQuestionnaire will return questionnaire', fakeQuestionnaire);
				PoguesActions.receiveQuestionnaire(fakeQuestionnaire);
			}
		}, timeout);
	}
};

module.exports = DataUtils;