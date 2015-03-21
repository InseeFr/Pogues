
// FIXME do we put that in constants dir ?
const TYPES = ['INSTRUCTION','COMMENT','HELP'];

class Declaration {

  constructor() {
    this.type = '';
    this.disjoinable = true;
    this.text = '';
  }

  set setType(type) {
    if (!(type in TYPES)) {
      throw new Error('You must choose a valid declaration type !');
    }
    this.type = type;
  }

  set setDisjoinable(bool) {
    if(!(typeof bool === 'boolean')) {
      throw new Error('Disjoinable must be a boolean !');
    }
    this.disjoinable = bool;
  }

  set setText(text) {
    if(!(typeof bool === 'string')) {
      throw new Error('Declaration text must be a string !');
    }
    this.text = text;
  }
}

export default Declaration;
