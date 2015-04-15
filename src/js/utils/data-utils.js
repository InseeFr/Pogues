var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require('../models/Questionnaire');
var SequenceModel = require('../models/Sequence');
var QuestionModel = require('../models/Question');
var Config = require('../config/config');
var request = require('superagent');

// FIXME extrat from uri found in res.header.Location
function extractId(questionnaire) {
  // FIXME use a regular expression to extract id from url
  return questionnaire.id;
}

var DataUtils = {
  populateQuestionnaire: function(questionnaire) {
    var numberOfSequences = 15;
    for (var sequenceIndex = 1; sequenceIndex <= numberOfSequences; sequenceIndex++) {
        var sequence = new SequenceModel();
        sequence.name = 'sequence_' + sequenceIndex;
        sequence.depth = 1;
        var numberOfChildren = Math.floor(Math.random() * 5);
        for (var childIndex = 1; childIndex <= numberOfChildren; childIndex++) {
            var childNumber = sequenceIndex * 10 + childIndex;
            var child = null;
            if (Math.random() < 0.5) {
                child = new QuestionModel();
                child.name = 'question_' + childNumber;
                child.label = 'question_' + childNumber;
                sequence.addChild(child);
            } else {
                child = new SequenceModel();
                child.name = 'sequence_ ' + childNumber;
                var numberOfQuestions = Math.floor(Math.random() * 5);
                for (var questionIndex = 1; questionIndex <= numberOfQuestions; questionIndex++) {
                    var questionNumber = childNumber * 10 + questionIndex;
                    var question = new QuestionModel();
                    question.name = 'question_' + questionNumber;
                    question.label = 'question_' + questionNumber;
                    child.addChild(question);
                }
                sequence.addChild(child);
            }
            questionnaire.addChild(sequence);
        }
    }
  },


  getQuestionnaireList: function() {

    if (Config.poguesURL) {
      return this.mock.getQuestionnaireList();
    } else return this.mock.getQuestionnaireList();
  },

  getQuestionnaire: function(index) {
    var questionnaire;
    if (Config.poguesURL) {
      request
        .get(Config.poguesURL + '/questionnaire/' + index)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err) return;
          if (res.ok) {
            // FIXME rebuild a questionnaire, not a literal object representing
            // the questionaire
            questionnaire = JSON.parse(res.body);
            console.log('DataUtils.getQuestionnaire will return questionnaire', questionnaire);
            PoguesActions.receiveQuestionnaire(questionnaire);
          } else {
            console.log(res.body);
          }
        });
    } else return this.mock.loadDeepQuestionnaire(index);
  },
  createQuestionnaireDistant: function(questionnaire) {
    var questionnaireId;
    // HACK mock
    setTimeout(function () {
      questionnaireId = extractId(questionnaire);//extrat from uri
      console.log('DataUtils.getQuestionnaire will return questionnaire', questionnaire);
      PoguesActions.receiveNewIdFromServer(questionnaire.id, questionnaire.id);
    }, 1000);
    return;
/*    request
      .post(Config.poguesURL + '/questionnaires')
      .set('Content-Type', 'text/html')
      .send(JSON.stringify(questionnaire))
      .end(function (err, res){
          if (err) return;
          if (res.ok) {
            questionnaireId = extractId(questionnaire);//extrat from uri
            console.log('DataUtils.getQuestionnaire will return questionnaire', questionnaire);
            PoguesActions.receiveNewIdFromServer(questionnaire.id, questionnaire.id);
          } else {
            console.log(res.body);
          }
      })*/
  },

  saveQuestionnaire: function(questionnaire) {
    request
    .put(Config.poguesURL + '/questionnaire/' + questionnaire.id)
    .send(questionnaire).set('Content-Type', 'text/html')
    .end(function(err, res) {
      if (err) PoguesActions.getQuestionnaireFailed();
      if (res.ok) {
        console.log(res.body);
      } else {
        console.log(res.body);
      }
    });
  },

  mock: {

    getQuestionnaireList: function() {
      var numberOfQuestionnaires = Math.floor(Math.random() * 30);
      var timeout = Math.random() * 5;
      var fail = (Math.random() < 0.001);
      console.log('Creating ' + numberOfQuestionnaires + ' questionnaires in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
      setTimeout(function() {
        if (fail) PoguesActions.getQuestionnaireListFailed();
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

    // Mock function will return a questionnaire with from 0 to 9 sequences containing 0 to 4 sequences (with 0-4 child questions) or questions in 0 to 1 second, and a 5% possibility of error
    getQuestionnaire: function(index) {

      var numberOfSequences = Math.floor(Math.random() * 10);
      var timeout = Math.random() * 1;
      var fail = (Math.random() < 0.005);
      var questionnaire = QuestionnaireListStore.getQuestionnaire(index);
      console.log('Creating ' + numberOfSequences + ' sequences in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
      setTimeout(function() {
        if (fail) PoguesActions.getQuestionnaireFailed();
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
          console.log('DataUtils.getQuestionnaire will return questionnaire', fakeQuestionnaire);
          PoguesActions.receiveQuestionnaire(fakeQuestionnaire);
        }
      }, timeout);
    }
  }
};

module.exports = DataUtils;
