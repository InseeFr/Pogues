import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isQuestion, getSortedChildren } from 'utils/component/component-utils';

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
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(e, key) {
    e.preventDefault();
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
  handleClick(e, key) {
    e.preventDefault();
    this.props.setSelectedComponentId(key);
  }

  renderComponentsByParent(components, parent) {
    const renderComponentsByParent = this.renderComponentsByParent;

    return getSortedChildren(components, parent).map(key => {
      const subTree = renderComponentsByParent(components, key);
      return (
        <li
          key={key}
          className={isQuestion(components[key]) ? 'questions' : ''}
        >
          {components[key].children && components[key].children.length > 0 && (
            <a
              onClick={e => this.handleExpand(e, key)}
              href="#"
              aria-label="expand/collapse"
            >
              <span
                className={`glyphicon ${
                  this.state.expanded.indexOf(key) >= 0
                    ? 'glyphicon-menu-down'
                    : 'glyphicon-menu-right'
                }`}
              />
            </a>
          )}
          <a href="#" onClick={e => this.handleClick(e, key)}>
            {components[key].name.toUpperCase()}
          </a>
          {this.state.expanded.indexOf(key) >= 0 && (
            <ul className="arbo-simplifield">{subTree}</ul>
          )}
        </li>
      );
    }, {});
  }
  render() {
    return (
      <ul className="arbo-simplifield">
        {this.renderComponentsByParent(
          this.props.components,
          this.props.questionnaire.id,
        )}
      </ul>
    );
  }
}

export default ArboSimplified;
