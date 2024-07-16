// @TODO: Scroll on select error

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ERRORS_INTEGRITY } from '../../constants/dom-constants';
import { getIntegrityErrors } from '../../utils/integrity/utils';

const { COMPONENT_ID, INNER, ALERT, LIST } = ERRORS_INTEGRITY;

// Utils

function renderComponentsErrors(errorsIntegrity, componentsStore) {
  // We are testing if the component exists in the active components store
  return Object.keys(errorsIntegrity)
    .filter(componentId => componentsStore[componentId])
    .reduce((acc, componentId) => {
      const integrityErrors = getIntegrityErrors(errorsIntegrity[componentId]);

      if (integrityErrors.length > 0) {
        const componentErrorsOutput = (
          <li key={componentId}>
            <span>{componentsStore[componentId].name}</span>
            <ul>
              {integrityErrors.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          </li>
        );

        return [...acc, componentErrorsOutput];
      }

      return acc;
    }, []);
}

// Prop types and default props

const propTypes = {
  errorsIntegrity: PropTypes.object,
  componentsStore: PropTypes.object.isRequired,
  // setSelectedComponentId: PropTypes.func.isRequired,
};

const defaultProps = {
  errorsIntegrity: {},
};

// Component

class ErrorsIntegrity extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      expanded: [],
    };

    this.handleExpand = this.handleExpand.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
  }

  handleExpand(key) {
    if (this.state.expanded.indexOf(key) < 0) {
      this.setState(prevState => ({
        expanded: [...prevState.expanded, key],
      }));
    } else {
      this.setState(prevState => ({
        expanded: prevState.expanded.filter(k => k !== key),
      }));
    }
  }

  // handleSelect(e, key) {
  //   e.preventDefault();
  //   const { setSelectedComponentId, components } = this.props;
  //
  //   if (components[key].type !== QUESTIONNAIRE) {
  //     setSelectedComponentId(key);
  //   }
  // }

  render() {
    const { errorsIntegrity, componentsStore } = this.props;
    const componentsErrors = renderComponentsErrors(
      errorsIntegrity,
      componentsStore,
    );

    return (
      <div id={COMPONENT_ID}>
        {componentsErrors.length > 0 && (
          <div className={INNER}>
            <div className={ALERT}>
              <div className="alert-icon big">
                <div className="alert-triangle" />!
              </div>
            </div>
            <div className={LIST}>
              <ul>{componentsErrors}</ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorsIntegrity;
