/**
Textual material associated to a sequence or question
*/
// FIXME do we put that in constants dir?
const TYPES = ['INSTRUCTION', 'COMMENT', 'HELP'];

class Declaration {

  constructor() {
    this.type = '';
    this.disjoinable = true;
    this.text = '';
  }

  set setType(type) {
    if (!(type in TYPES)) {
      throw new Error(type + 'is not a valid declaration type');
    }
    this.type = type;
  }

  set setDisjoinable(bool) {
    if(!(typeof bool === 'boolean')) {
      throw new Error('The parameter must be a boolean');
    }
    this.disjoinable = bool;
  }

  set setText(text) {
    if(!(typeof text === 'string')) {
      throw new Error('The parameter must be a string');
    }
    this.text = text;
  }
}

export default Declaration;
