var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require('../models/questionnaire');
var SequenceModel = require('../models/sequence');
var QuestionModel = require('../models/question');
var ResponseModel = require('../models/response');
var DeclarationModel = require('../models/declaration');
var ExpressionModel = require('../models/expression');
var ControlModel = require('../models/control');
var GoToModel = require('../models/go-to');
var Config = require('../stores/config-store').getConfig();
var ModelConstants = require('../models/model-constants');
var request = require('superagent');
var TextDatatypeModel = require('../models/text-datatype');
var DateDatatypeModel = require('../models/date-datatype');
var NumericDatatypeModel = require('../models/numeric-datatype');
var Logger = require('../logger/logger');
import serializeQuestionnaire from './data-json-utils';

var logger = new Logger('DataUtils', 'Utils');

// FIXME extrat from uri found in res.header.Location
function extractId(uri) {
  // FIXME use a regular expression to extract id from url
  // example of uri : http://10.3.4.54:8338/exist/restxq/questionnaire/agence-enquete-QPO-DSFGFD
  return uri.substr(uri.lastIndexOf('/') + 1);
}

var rName = /^[a-z0-9_]*$/i;
var rNameNeg = /[^a-z0-9_]/gi;

function createFakeQuestionnaire() {
  var questionnaire = new QuestionnaireModel();
  questionnaire.label = 'FAKEQ_458';
  questionnaire.name = 'My fake questionnaire';
  populateFakeQuestionnaire(questionnaire);
  return questionnaire;
}

function populateFakeQuestionnaire(questionnaire) {
    var numberOfSequences = 10;
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
                populateFakeComponent(child);
                sequence.addChild(child);
            } else {
                child = new SequenceModel();
                child.name = 'sequence_' + childNumber;
                var numberOfQuestions = Math.floor(Math.random() * 5);
                for (var questionIndex = 1; questionIndex <= numberOfQuestions; questionIndex++) {
                    var questionNumber = childNumber * 10 + questionIndex;
                    var question = new QuestionModel();
                    question.name = 'question_' + questionNumber;
                    question.label = 'question_' + questionNumber;
                    populateFakeComponent(question);
                    child.addChild(question);
                }
                populateFakeComponent(child);
                sequence.addChild(child);
            }
        }
        populateFakeComponent(sequence);
        questionnaire.addChild(sequence);
    }
    questionnaire.name = "YOQUEST";
  }

// Adds some declarations, controls and go-tos to a component
function populateFakeComponent(component) {
  // Adding zero to 3 declarations
  var numberOfDeclarations = Math.floor(Math.random() * 4);
  for (var declarationIndex = 1; declarationIndex <= numberOfDeclarations; declarationIndex++) {
    var declaration = new DeclarationModel();
    var typeOfDeclarationIndex = Math.floor(Math.random() * 3);
    declaration.type = ModelConstants.DeclarationModel.DECLARATION_TYPES[typeOfDeclarationIndex];
    declaration.disjoinable = (Math.random() < 0.5);
    declaration.text = 'Declaration ' + declarationIndex + ' for ' + component.name;
    component.declarations.push(declaration);
  }
  // Adding zero to 2 controls
  var numberOfControls = Math.floor(Math.random() * 3);
  for (var controlIndex = 1; controlIndex <= numberOfControls; controlIndex++) {
    var control = new ControlModel();
    control.description = 'Description of control ' + controlIndex + ' for ' + component.name;
    control.expression = new ExpressionModel({_text: 'http://controls.org/' + component.name + '/' + controlIndex});
    component.controls.push(control);
  }
  // Adding zero or one go-to's
  if (Math.random() < 0.5) {
    var goTo = new GoToModel();
    goTo.description = 'Description of go to for ' + component.name;
    goTo.expression = new ExpressionModel({_text: 'http://go-tos.org/' + component.name + '/go-to'});
    goTo.ifTrue = new QuestionModel(); // TODO Direct to an existing component
    component.goTos.push(goTo);
  }
  if (component instanceof QuestionModel) populateFakeQuestion(component);
}

function populateFakeQuestion(question) {
  var response;
  // In 80% of the cases, the question will be simple
  question.simple = (Math.random() < 0.8);
  // In 80% of the cases, there will be one unique answer
  var numberOfResponses = (Math.random() < 0.9) ? 1 : 2;
  for (var responseIndex = 0; responseIndex <= numberOfResponses; responseIndex++) {
    response = new ResponseModel();
    response.mandatory = (Math.random() < 0.5);
    var datatypeTypeIndex = Math.floor(Math.random() * 3);
    var datatype = null;
    switch (datatypeTypeIndex) {
        case 0:
            datatype = new DateDatatypeModel();
            datatype.format = 'ddmmyyyy';
            break;
        case 1:
            datatype = new NumericDatatypeModel();
            break;
        case 2:
            datatype = new TextDatatypeModel();
            datatype.maxLength = 15;
            datatype.pattern = '[A-Z]*';
            break;
    }
    response.datatype = datatype;
    question.addResponse(response);
  }
}

var DataUtils = {
  populateFakeQuestionnaire: populateFakeQuestionnaire,

  nameFromLabel: function(label) {
    return label.replace(rNameNeg, '').toUpperCase().slice(0, 10);
  },
  /*
  Send a GET request to the remote API to fetch the list of questionnaires.
  */
  getQuestionnaireList: function() {
    var targetURL = Config.baseURL + Config.persistPath + '/questionnaires';
    if(Config.remote) {
      logger.debug('Fetching the questionnaire list at ' + targetURL);
      request
        .get(targetURL)
        .set('Accept', 'text/plain')
        .end(function(err, res) {
          if (err) return;
          if(res.ok) {
            logger.debug('GET questionnaire list from server returned: ', JSON.parse(res.text));
            PoguesActions.receiveQuestionnaireList(JSON.parse(res.text));
          }
        });
    } else {
      // TODO local mock
    }
  },

  getQuestionnaire: function(index) {
    var questionnaire;
    var targetURL = Config.baseURL + Config.persistPath + '/questionnaire/' + index;
    if (Config.remote) {
      request
        .get(targetURL)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err) return;
          if (res.ok) {
            // FIXME rebuild a questionnaire, not a literal object representing the questionaire
            // FIXME if content-type is not set properly in the response headers res.body is null
            questionnaire = new QuestionnaireModel(JSON.parse(res.text));
            logger.debug('DataUtils.getQuestionnaire will return questionnaire: ', questionnaire);
            PoguesActions.receiveQuestionnaire(questionnaire);
          } else {
            logger.error('GET questionnaire not OK, returned: ', res.body);
          }
        });
    } else {
      setTimeout(PoguesActions.receiveQuestionnaire.bind(null, createFakeQuestionnaire()));
    }
  },

  createQuestionnaire: function(questionnaire) {
    var newId;
    var targetURL = Config.baseURL + Config.persistPath + '/questionnaires';
    if (Config.remote) {
      logger.debug('Remote creation of questionnaire ' + questionnaire.id + ' with a POST request');
      request
        .post(targetURL)
        .set('Content-Type', 'text/html')
        .send(JSON.stringify(questionnaire))
        .end(function (err, res){
            if (err) return;
            if (res.ok) {
              newId = extractId(res.headers.location);//extrat from uri
              logger.debug('New id is : ' + newId);
              // TODO check in  header slug is the same as oldId
              //PoguesActions.receiveNewIdFromServer(questionnaire.id, newId);
              PoguesActions.selectQuestionnaire(newId);
            } else {
              logger.error('POST questionnaire not OK, returned: ', res.body);
            }
      });
    }
    else {
      setTimeout(PoguesActions.selectQuestionnaire.bind(null, 'NEW_' + questionnaire.id), 0);
    }
  },

  /*
  Save the questionnaire, i.e. persist it in the remote server data store.
  */
  saveQuestionnaire: function(questionnaire) {
    logger.info('Saving questionnaire ' + questionnaire.id + ' with a PUT request');
    var targetURL = Config.baseURL + Config.persistPath + '/questionnaire/' + questionnaire.id;
    logger.debug('Target URL is ' + targetURL);    
    request
      .put(targetURL)
      .set('Content-Type', 'text/html')
      .send(JSON.stringify(questionnaire))
      .end(function(err, res) {
        if (err) PoguesActions.getQuestionnaireFailed();
        if (res.ok) {
          // FIXME
          logger.debug('PUT questionnaire OK, returned: ', res.body);
        } else {
          // FIXME
          logger.error('PUT questionnaire not OK, returned: ', res.body);
        }
      });
  },

  // Send a questionnaire to the publish service.
  publishQuestionnaire: function(questionnaire) {
    var targetURL = Config.baseURL + Config.stromaePath;
    logger.info('Publishing questionnaire ' + questionnaire.id + ' to ' + targetURL);
    var serializedQuestionnaire = serializeQuestionnaire(questionnaire);
    logger.debug('Serialized questionnaire is ', serializedQuestionnaire, JSON.stringify(serializedQuestionnaire));
    var start = new Date().getTime();
    request
      .post(targetURL)
      .set('Content-Type','text/html')
      .send(JSON.stringify(serializedQuestionnaire))
      .end(function(err, res) {
        if (res.ok) {
          var url = res.headers.location;
          var end = new Date().getTime();
          var execTimeSec = (end - start) / 1000;
          logger.debug('Response timing : ', execTimeSec, ' sec');
          logger.debug('Location header is : ', url);
          logger.info('Publish OK', ' - URL is :', url);
          PoguesActions.getPublicationURL(url);
        } else {
          logger.error('Error trying to publish the questionnaire');
        }
      });
  },

  createFakeQuestionnaire: createFakeQuestionnaire,

  // Contains mock functions
  mock: {

    getQuestionnaireList: function() {
      var numberOfQuestionnaires = Math.floor(Math.random() * 30);
      var timeout = Math.random() * 5;
      var fail = (Math.random() < 0.001);
      logger.debug('Creating ' + numberOfQuestionnaires + ' questionnaires in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
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
      logger.debug('Creating ' + numberOfSequences + ' sequences in ' + timeout + ' ms will ' + (fail ? 'fail' : 'succeed'));
      setTimeout(function() {
        if (fail) PoguesActions.getQuestionnaireFailed();
        else {
            populateFakeQuestionnaire(questionnaire);
            var fakeQuestionnaire = {
              questionnaire: questionnaire
          };
          logger.debug('DataUtils.getQuestionnaire will return questionnaire: ', fakeQuestionnaire);
          PoguesActions.receiveQuestionnaire(fakeQuestionnaire);
        }
      }, timeout);
    }
  }
};

module.exports = DataUtils;
