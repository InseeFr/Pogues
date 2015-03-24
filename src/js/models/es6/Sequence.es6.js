/**
A Sequence of questions or other sequences
*/
import Component from './Component.js'

// FIXME Internationalize
const GENERIC_NAMES = ['Module', 'Paragraphe', 'Séquence'];

class Sequence extends Component {
  constructor() {
    super();
    this.depth = 0;
    // Module, paragraph, etc. Should really not be a member, in fact.
    this.genericName = GENERIC_NAMES[0];
    this.children = [];
  }

  get getDepth() {
    return this.depth;
  }

  set setDepth(depth) {
    // TODO Add type check
    this.depth = depth;
    if (depth < GENERIC_NAMES.length - 1) this.genericName = GENERIC_NAMES[depth];
    else this.genericName = GENERIC_NAMES[GENERIC_NAMES.length - 1] + '-' + depth;
  }

  addChild(child) {
    if(!(child instanceof Component)) {
      throw new Error('The argument must be a Component');
    }
    if (child instanceof Sequence) child.setDepth(this.depth + 1);

    this.children.push(child);
  }

  addChildren(children) {
    // Save current size in case something goes wrong
    initialSize = this.declarations.length;
    try {
      children.map(function(child) {
        this.addChild(child);
      });
    } catch (e) {
      this.children.length(initialSize);
      throw new Error('All arguments must be of type Component');
    }
  }

  set setChildren(children) {
    children.map(function(child) {
      if(!(child instanceof Component)) {
        throw new Error('All arguments must be of type Component');
      }
    });
    this.children = children;
  }

}

export default Sequence;
