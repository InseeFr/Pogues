import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isQuestion } from 'utils/component/component-utils';

class ArboSimplified extends Component {
  static propTypes = {
    components: PropTypes.object.isRequired,
    questionnaire: PropTypes.object.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      expanded: [],
    };

    this.renderComponentsByParent = this.renderComponentsByParent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, key) {
    e.preventDefault();
    this.props.setSelectedComponentId(key);
    if (this.state.expanded.indexOf(key) < 0) {
      this.setState({
        expanded: [...this.state.expanded, key],
      });
    } else {
      this.setState({
        expanded: this.state.expanded.filter(k => k !== key),
      });
    }
  }

  renderComponentsByParent(components, parent) {
    const renderComponentsByParent = this.renderComponentsByParent;
    return Object.keys(components)
      .filter(key => components[key].parent === parent)
      .sort((key, nextKey) => {
        if (components[key].weight < components[nextKey].weight) return -1;
        if (components[key].weight > components[nextKey].weight) return 1;
        return 0;
      })
      .map(key => {
        const subTree = renderComponentsByParent(components, key);
        return (
          <li key={key} className={isQuestion(components[key]) ? 'questions' : ''}>
            {!isQuestion(components[key]) &&
              <span
                className={`glyphicon ${this.state.expanded.indexOf(key) >= 0
                  ? 'glyphicon-menu-down'
                  : 'glyphicon-menu-right'}`}
              />}
            <a href="#" title={components[key].title} onClick={e => this.handleClick(e, key)}>{components[key].name}</a>
            {this.state.expanded.indexOf(key) >= 0 && <ul className="arbo-simplifield">{subTree}</ul>}
          </li>
        );
      }, {});
  }
  render() {
    return (
      <ul className="arbo-simplifield">
        {this.renderComponentsByParent(this.props.components, this.props.questionnaire.id)}
      </ul>
    );
  }
}

export default ArboSimplified;
