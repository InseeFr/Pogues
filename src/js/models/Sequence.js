/**
A Sequence of questions or other sequences
*/
import ComponentModel from './Component.js';
import QuestionModel from './Question.js';

// FIXME Internationalize
const GENERIC_NAMES = ['Questionnaire', 'Module', 'Paragraphe', 'Séquence'];

class SequenceModel extends ComponentModel {
  constructor(object) {
    super(object);
    if (object) {
      this._depth = object._depth;
      // Module, paragraph, etc. Should really not be a member, in fact.
      this._genericName = object._genericName;
      this._children = object._children.map(function(child) {
        return (child.depth > 0) ? new SequenceModel(child) : new QuestionModel(child);
      });
    } else {
      this._depth = 0;
      // Module, paragraph, etc. Should really not be a member, in fact.
      this._genericName = GENERIC_NAMES[0];
      this._children = [];
    }
  }

  get depth() {
    return this._depth;
  }

  get genericName() {
    return this._genericName;
  }

  get children() {
    return this._children;
  }

  set depth(depth) {
    // TODO Add type check
    this._depth = depth;
    if (depth < GENERIC_NAMES.length - 1) this._genericName = GENERIC_NAMES[depth];
    else this._genericName = GENERIC_NAMES[GENERIC_NAMES.length - 1] + '-' + depth;
  }

  addChild(child) {
    if (!(child instanceof ComponentModel)) {
      throw new Error('The argument must be a Component');
    }
    if (child instanceof SequenceModel) child.depth = this._depth + 1;

    this._children.push(child);
  }

  addChildren(children) {
    // Save current size in case something goes wrong
    var initialSize = this._children.length;
    try {
      children.map(function(child) {
        this.addChild(child);
      });
    } catch (e) {
      this._children.length(initialSize);
      throw new Error('All arguments must be of type Component');
    }
  }

  set children(children) {
    children.map(function(child) {
      if (!(child instanceof ComponentModel)) {
        throw new Error('All arguments must be of type Component');
      }
    });
    this._children = children;
  }

}

export default SequenceModel;
