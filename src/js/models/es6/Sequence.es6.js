/**
A Sequence of questions or other sequences
*/
import Component from './Component.js'

class Sequence extends Component {
  constructor() {
    super();
	this.depth = 0;
    this.genericName = '';
    this.children = [];
  }

  add(component) {
    if(component instanceof Component) {
      this.children.push(component);
      return true;
    } else {
      return false;
    }
  }
}

export default Sequence;
