
/*
QuestionnaireUtils test suite
*/

// Whats need not to be mock
jest.dontMock('../questionnaire-utils.js');
jest.dontMock('../../models/Questionnaire.js');
jest.dontMock('../../models/Component.js');
jest.dontMock('../../models/Sequence.js');
jest.dontMock('../../models/Question.js');

var QuestionnaireUtils = require('../questionnaire-utils.js');
var QuestionnaireModel = require('../../models/Questionnaire');
var SequenceModel = require('../../models/Sequence');
var QuestionModel = require('../../models/Question');

describe('QuestionnaireUtils search function', function() {
  it('should find an element by id in a simple questionnaire', function() {
    var simpleQuestionnaire = new QuestionnaireModel();
    var seq = new SequenceModel();
    var quest = new QuestionModel();
    var qid = quest.id;

    seq.addChild(quest);

    var searchOK = QuestionnaireUtils
      .searchAndApply(
        seq.children,
        'id',
        qid,
        function(e) { e.name = 'nouveau nom'; });

    expect(seq.children[0].name).toBe('nouveau nom');
  });
  // TODO test case with a deep nesting
})
