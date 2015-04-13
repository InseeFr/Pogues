var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require('../models/Questionnaire');
var SequenceModel = require('../models/Sequence');
var QuestionModel = require('../models/Question');
var Config = require('../config/config');
var request = require('superagent');

var DataUtils = {

  loadQuestionnaireList: function() {

    if (!Config.poguesURL) {


    } else return this.mock.loadQuestionnaireList();
  },

  loadQuestionnaire: function(index) {

    // if (!Config.poguesURL) {

    // } else return this.mock.loadDeepQuestionnaire();
    // For now we don't mock this function
    this.mock.loadDeepQuestionnaire(index);
  },

  createQuestionnaireOnServer: function(questionnaire) {

  },
  saveQuestionnaire: function(questionnaire) {
    request.put(Config.poguesURL + '/questionnaire/' + questionnaire.id).send(questionnaire).set('Content-Type', 'text/html').end(function(err, res) {
      if (res.ok) {
        console.log(res.body);
      } else {
        console.log(res.body);
      }
    });
  }

  mock: {

    loadQuestionnaireList: function() {
      var numberOfQuestionnaires = Math.floor(Math.random() * 30);
      var timeout = Math.random() * 5;
      var fail = (Math.random() < 0.001);
      console.log('Creating ' + numberOfQuestionnaires + ' questionnaires in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
      setTimeout(function() {
        if (fail) PoguesActions.loadQuestionnaireListFailed();
        else {
          var questionnaires = [];
          for (var index = 1; index <= numberOfQuestionnaires; index++) {
            var questionnaire = new QuestionnaireModel();
            questionnaire.name = 'Questionnaire numéro ' + index;
            questionnaires.push(questionnaire);
          }
          var fakeList = {
            questionnaires: questionnaires
          };
          PoguesActions.receiveQuestionnaireList(fakeList);
        }
      }, timeout);
    },
    // Mock function will return a questionnaire with from 1 to 10 sequences containing 1 to 5 questions in 0 to 1 second, and a 5% possibility of error
    loadQuestionnaire: function(index) {

      var numberOfSequences = Math.floor(Math.random() * 10) + 5;
      var timeout = Math.random() * 1;
      var fail = (Math.random() < 0.005);
      var questionnaire = QuestionnaireListStore.getQuestionnaire(index);
      console.log('Creating ' + numberOfSequences + ' sequences in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
      setTimeout(function() {
        if (fail) PoguesActions.loadQuestionnaireFailed();
        else {
          for (var sequenceIndex = 1; sequenceIndex <= numberOfSequences; sequenceIndex++) {
            var sequence = new SequenceModel();
            sequence.name = 'Séquence numéro ' + sequenceIndex;
            sequence.depth = 1;
            var numberOfQuestions = Math.floor(Math.random() * 5) + 5;
            for (var questionIndex = 1; questionIndex <= numberOfQuestions; questionIndex++) {
              var questionNumber = sequenceIndex * 10 + questionIndex;
              var question = new QuestionModel();
              question.name = 'Question numéro ' + questionNumber;
              question.label = 'Énoncé de la question numéro ' + questionNumber;
              sequence.addChild(question);
            }
            questionnaire.addChild(sequence);
          }
          var fakeQuestionnaire = {
            questionnaire: questionnaire
          };
          console.log('DataUtils.loadQuestionnaire will return questionnaire', fakeQuestionnaire);
          console.dir(fakeQuestionnaire);
          PoguesActions.receiveQuestionnaire(fakeQuestionnaire);
        }
      }, timeout);
    },
    // Mock function will return a questionnaire with from 0 to 9 sequences containing 0 to 4 sequences (with 0-4 child questions) or questions in 0 to 1 second, and a 5% possibility of error
    loadDeepQuestionnaire: function() {

      var numberOfSequences = Math.floor(Math.random() * 10);
      var timeout = Math.random() * 1;
      var fail = (Math.random() < 0.005);
      var questionnaire = QuestionnaireListStore.getQuestionnaire(index);
      console.log('Creating ' + numberOfSequences + ' sequences in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
      setTimeout(function() {
        if (fail) PoguesActions.loadQuestionnaireFailed();
        else {
          for (var sequenceIndex = 1; sequenceIndex <= numberOfSequences; sequenceIndex++) {
            var sequence = new SequenceModel();
            sequence.name = 'Séquence numéro ' + sequenceIndex;
            sequence.depth = 1;
            var numberOfChildren = Math.floor(Math.random() * 5);
            for (var childIndex = 1; childIndex <= numberOfChildren; childIndex++) {
              var childNumber = sequenceIndex * 10 + childIndex;
              var child = null;
              if (Math.random() < 0.5) {
                child = new QuestionModel();
                child.name = 'Question numéro ' + childNumber;
                child.label = 'Énoncé de la question numéro ' + childNumber;
                sequence.addChild(child);
              } else {
                child = new SequenceModel();
                child.name = 'Séquence numéro ' + childNumber;
                var numberOfQuestions = Math.floor(Math.random() * 5);
                for (var questionIndex = 1; questionIndex <= numberOfQuestions; questionIndex++) {
                  var questionNumber = childNumber * 10 + questionIndex;
                  var question = new QuestionModel();
                  question.name = 'Question numéro ' + questionNumber;
                  question.label = 'Énoncé de la question numéro ' + questionNumber;
                  child.addChild(question);
                }
                sequence.addChild(child);
              }
            }
            questionnaire.addChild(sequence);
          }
          var fakeQuestionnaire = {
            questionnaire: questionnaire
          };
          console.log('DataUtils.loadQuestionnaire will return questionnaire', fakeQuestionnaire);
          PoguesActions.receiveQuestionnaire(fakeQuestionnaire);
        }
      }, timeout);
    }
  }
};

module.exports = DataUtils;
