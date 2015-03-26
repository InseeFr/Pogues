/**
Textual material associated to a sequence or question
*/
// FIXME do we put that in constants dir?
const TYPES = ['INSTRUCTION', 'COMMENT', 'HELP'];

class Declaration {

  constructor() {
    this._type = '';
    this._disjoinable = true;
    this._text = '';
  }

  get type() {
    return this._type;
  }

  get disjoinable() {
    return this._disjoinable;
  }

  get text() {
    return this._text;
  }

  set type(type) {
    if (!(type in TYPES)) {
      throw new Error(type + 'is not a valid declaration type');
    }
    this._type = type;
  }

  set disjoinable(bool) {
    if (typeof bool !== 'boolean') {
      throw new Error('The parameter must be a boolean');
    }
    this._disjoinable = bool;
  }

  set text(text) {
    if (typeof text !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._text = text;
  }
}

export default Declaration;
