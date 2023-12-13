import React, { Component } from 'react';

import { WIDGET_VALIDATION_ERRORS } from '../../constants/dom-constants';
import { getKey } from '../../utils/widget-utils';

const { COMPONENT_CLASS } = WIDGET_VALIDATION_ERRORS;

// Component

class ComponentWithValidation extends Component {
  constructor(props) {
    super(props);

    this.state = { validationErrors: [] };
    this.executeIfValid = this.executeIfValid.bind(this);
  }

  executeIfValid(action) {
    const errors = this.props.meta.error || [];
    this.setState({ validationErrors: errors });
    if (errors.length === 0) action();
  }

  render() {
    const { validationErrors } = this.state;

    return (
      <div className={COMPONENT_CLASS}>
        {validationErrors.length > 0 && (
          <ul>
            {validationErrors.map(err => (
              <li key={getKey(`${err[0]}${err[1]}`)}>{err[0]}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default ComponentWithValidation;
