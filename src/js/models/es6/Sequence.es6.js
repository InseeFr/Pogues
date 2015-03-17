/**
A Sequence
*/
import Component from './Component.es6.js'

class Sequence extends Component {
  constructor() {
    super();

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

exports default Sequence;
