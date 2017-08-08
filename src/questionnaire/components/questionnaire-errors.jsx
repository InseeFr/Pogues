import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

class QuestionnaireErrors extends Component {
  static propTypes = {
    errorsByComponent: PropTypes.object,
    components: PropTypes.object,
    setSelectedComponentId: PropTypes.func.isRequired,
  };
  static defaultProps = {
    errorsByComponent: {},
    components: {},
  };
  constructor() {
    super();
    this.state = {
      expanded: [],
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
  handleSelect(e, key) {
    e.preventDefault();
    const { setSelectedComponentId, components } = this.props;

    if (components[key].type !== QUESTIONNAIRE) {
      setSelectedComponentId(key);
    }
  }
  render() {
    const { errorsByComponent, components } = this.props;

    const listErrors = Object.keys(errorsByComponent).map(id => {
      const invalidComponent = errorsByComponent[id];

      const component = `[${components[id].name}] ${components[id].label}`;

      const errors = invalidComponent.errors.map((e, index) => {
        return (
          <li key={`${e.code}-${index}`}>
            {Dictionary[e.dictionary]}
          </li>
        );
      });

      return (
        <li key={id}>
          <i className="fa fa-plus-square-o" onClick={e => this.handleExpand(e, id)} />
          <span onClick={e => this.handleSelect(e, id)}>
            {component}
          </span>
          {this.state.expanded.indexOf(id) >= 0 &&
            <ul>
              {errors}
            </ul>}
        </li>
      );
    });

    return (
      <ul>
        {listErrors}
      </ul>
    );
  }
}

export default QuestionnaireErrors;
