import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import { getControlId } from '../../utils/widget-utils';
import { CONTROL_TEXTAREA } from '../../constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_TEXTAREA;

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  focusOnInit: PropTypes.bool,
};

export const defaultProps = {
  required: false,
  disabled: false,
  focusOnInit: false,
};

// Control

class Textarea extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  componentDidMount() {
    if (this.props.focusOnInit) this.input.focus();
  }

  render() {
    const {
      label,
      required,
      disabled,
      input,
      meta: { touched, error },
    } = this.props;
    const id = getControlId('textarea', input.name);

    return (
      <div className={COMPONENT_CLASS}>
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          <textarea
            {...input}
            id={id}
            placeholder={label}
            disabled={disabled}
            ref={node => {
              this.input = node;
            }}
          />

          {touched && error && <span className="form-error">{error}</span>}
        </div>
      </div>
    );
  }
}

export default Textarea;
