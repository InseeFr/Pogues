import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import { getControlId } from 'utils/widget-utils';
import { CONTROL_INPUT } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_INPUT;

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  focusOnInit: PropTypes.bool,
  onKeyDown: PropTypes.func,
  reference: PropTypes.func,
};

export const defaultProps = {
  label: undefined,
  placeholder: '',
  className: '',
  required: false,
  disabled: false,
  focusOnInit: false,
  onKeyDown: undefined,
  reference: undefined,
};

class Input extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    if (this.props.focusOnInit) this.input.focus();
    if (this.props.reference) this.props.reference(this.input);
  }

  render() {
    const {
      className,
      onKeyDown,
      type,
      label,
      placeholder,
      required,
      disabled,
      input,
      meta: { touched, error },
    } = this.props;
    const id = getControlId('input', input.name);

    return (
      <div className={`${COMPONENT_CLASS} ${className}`}>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <span className="ctrl-required">*</span>}
          </label>
        )}

        <div>
          <input
            {...input}
            type={type}
            id={id}
            placeholder={placeholder !== '' || label}
            disabled={disabled}
            ref={node => {
              this.input = node;
            }}
            onKeyDown={onKeyDown}
          />

          {touched && (error && <span className="form-error">{error}</span>)}
        </div>
      </div>
    );
  }
}

export default Input;
