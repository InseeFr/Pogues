/**
A Sequence of questions or other sequences
*/
import ComponentModel from './component.js';
import QuestionModel from './question.js';
import ModelConstants from './model-constants';
import { stripLeadingUnderscore } from '../utils/name-utils';

var GENERIC_NAMES = ModelConstants.SequenceModel.GENERIC_NAMES;

const SIMPLE_FIELDS = ['_depth', '_genericName'];
const ARRAY_FIELDS = ['_children'];

class SequenceModel extends ComponentModel {
  constructor(object) {
    super(object);
    if (object) {
      this._depth = object._depth;
      // Module, paragraph, etc. Should really not be a member, in fact.
      this._genericName = object._genericName;
      this._children = object._children.map(function(child) {
        return (child._depth > 0) ? new SequenceModel(child) : new QuestionModel(child);
      });
    } else {
      this._depth = 0;
      // Module, paragraph, etc. Should really not be a member, in fact.
      this._genericName = GENERIC_NAMES[0];
      this._children = [];
    }
  }

  serialize() {
    var o = super.serialize();
    // Handling simple fields
    let simpleFields = Object.keys(this)
                            .filter(k => SIMPLE_FIELDS.indexOf(k) > -1);
    simpleFields.forEach(simpleField => o[stripLeadingUnderscore(simpleField)] = this[simpleField]);
    // Handling array fields
    let arrayFields = Object.keys(this)
                            .filter(k => ARRAY_FIELDS.indexOf(k) > -1);
    // TODO implements serialize in _children !
    arrayFields.forEach(field => o[stripLeadingUnderscore(field)] = this[field].map(element => element.serialize()));
    return o;
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

  removeChild(child) {
    var index = this._children.indexOf(child);
    if (index > -1) {
      this._children.splice(index, 1);
    } else {
      throw new Error('Component is not in sequence');
    }
  }

  addChildren(children) {
    if (!(Array.isArray(children))) throw new Error('The argument must be an array');
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
    if (!(Array.isArray(children))) throw new Error('The argument must be an array');
    children.map(function(child) {
      if (!(child instanceof ComponentModel)) {
        throw new Error('All arguments must be of type Component');
      }
    });
    this._children = children;
  }
}

export default SequenceModel;
