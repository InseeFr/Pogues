import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COMPONENT_TYPE } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

// Prop types and default props

const propTypes = {
  errorsByComponent: PropTypes.object.isRequired,
  components: PropTypes.object,
  setSelectedComponentId: PropTypes.func.isRequired
};

const defaultProps = {
  components: {}
};

// Component

class QuestionnaireErrors extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor() {
    super();
    this.state = {
      expanded: []
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleExpand(e, key) {
    e.preventDefault();
    if (this.state.expanded.indexOf(key) < 0) {
      this.setState({
        expanded: [...this.state.expanded, key]
      });
    } else {
      this.setState({
        expanded: this.state.expanded.filter(k => k !== key)
      });
    }
  }

  handleSelect(e, key) {
    e.preventDefault();
    const { setSelectedComponentId, components } = this.props;

    if (components[key].type !== QUESTIONNAIRE) {
      setSelectedComponentId(key);
    }
  }

  render() {
    const { errorsByComponent, components } = this.props;

    const listErrors = Object.keys(errorsByComponent)
      .filter(id => components[id])
      .map(id => {
        const expanded = this.state.expanded.indexOf(id) >= 0;
        const invalidComponent = errorsByComponent[id];
        const component = `[${components[id].name}] ${components[id].label}`;
        const errors = invalidComponent.errors.map((e, index) => {
          const message = e.params.dictionary
            ? e.params.dictionary
            : Dictionary[e.dictionary];
          return <li key={`${e.code}-${index}`}>{message}</li>;
        });

        return (
          <li key={id}>
            <a href={`#errors-${id}`} onClick={e => this.handleExpand(e, id)}>
              {expanded ? (
                <i className="fa fa-minus-square-o" />
              ) : (
                <i className="fa fa-plus-square-o" />
              )}
            </a>
            <a href={`#${id}`} onClick={e => this.handleSelect(e, id)}>
              {component}
            </a>
            {expanded && <ul>{errors}</ul>}
          </li>
        );
      });

    return <ul>{listErrors}</ul>;
  }
}

export default QuestionnaireErrors;
