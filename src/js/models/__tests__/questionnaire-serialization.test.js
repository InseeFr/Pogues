//serialization tests for models
jest.autoMockOff();

describe('Questionnaire serialization', function() {
  it('must work for a questionnaire that we just created', function() {
    var QuestionnaireModel = require('../questionnaire');
    var quest = new QuestionnaireModel();
    quest.name = 'ROM_QUEST';
    var jsonString = quest.serialize();
    expect(JSON.parse(jsonString).Questionnaire).toBeDefined();
    expect(JSON.parse(jsonString).Survey).toBeDefined();
    expect(JSON.parse(jsonString).survey).toBeUndefined();
  });
});
