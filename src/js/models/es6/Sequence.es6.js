/**
A Sequence
*/
import Component from './Component.js'

class Sequence extends Component {
  constructor() {
    super();
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

  sayYo() {
    return "YO";
  }
}

export default Sequence;
