var ModelConstants = require('../models/model-constants');

//mapping between response types and dictionary store
var responseTypes = {
  NUM: 'numType',
  STRING: 'stringType',
  CHOICE: 'choiceType'
};

module.exports = {

  SequenceModel: {
    GENERIC_NAMES: ['QUESTIONNAIRE', 'MODULE', 'PARAGRAPH', 'SEQUENCE']
  },
  DatatypeModel: {
    DATATYPE_TYPES: ['DATE', 'NUMERIC', 'TEXT']
  },
  DeclarationModel: {
    DECLARATION_TYPES: ['INSTRUCTION', 'COMMENT', 'HELP']
  }
};

module.exports = responseTypes;

