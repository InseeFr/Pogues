//serialization tests for models
jest.autoMockOff();

describe('Questionnaire serialization', function() {
  it('must work for a questionnaire that we just created', function() {
    var QuestionnaireModel = require('../questionnaire');
    var DeclarationModel = require('../declaration');
    var serializeQuestionnaire = require('../../utils/data-json-utils').serializeQuestionnaire;
    var quest = new QuestionnaireModel();
    var dec = new DeclarationModel({_type:'MYTYPE', _disjoinable:true, _text:'A simple text'});
    quest.name = 'ROM_QUEST';
    quest.addDeclaration(dec);
    var jsonString = quest.serialize();

    console.log(jsonString);

    console.log(serializeQuestionnaire(quest));

    expect(JSON.parse(jsonString).Questionnaire).toBeDefined();
    expect(JSON.parse(jsonString).Survey).toBeDefined();
    expect(JSON.parse(jsonString).survey).toBeUndefined();
  });
});
