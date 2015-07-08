//serialization tests for models
jest.autoMockOff();

import serializeQuestionnaire from '../../utils/data-json-utils';

describe('Questionnaire serialization', function() {
  it('must work for a questionnaire that we just created', function() {
    // TODO that test suite must be launched by bootstrapping correctly ES6
    // import declarations don't seem to work properly

    // var QuestionnaireModel = require('../questionnaire');
    // var DeclarationModel = require('../declaration');
    // var test = require('../../utils/data-json-utils');
    // var quest = new QuestionnaireModel();
    // var dec = new DeclarationModel({_type:'MYTYPE', _disjoinable:true, _text:'A simple text'});
    // quest.name = 'ROM_QUEST';
    // quest.addDeclaration(dec);
    //
    // console.log(JSON.stringify(test));
    // console.log(typeof serializeQuestionnaire);
    //
    // var serQuest = serializeQuestionnaire(quest);
    // console.log(serQuest);
    //
    // expect(serQuest.Questionnaire).toBeDefined();
    // expect(serQuest.Survey).toBeDefined();
    // // expect(JSON.parse(serQuest).survey).toBeUndefined();
  });
});
