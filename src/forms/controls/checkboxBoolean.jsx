import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import { getControlId } from '../../utils/widget-utils';

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
  reference: PropTypes.func,
  focusOnInit: PropTypes.bool,
};

export const defaultProps = {
  label: '',
  disabled: false,
  required: false,
  reference: undefined,
  focusOnInit: false,
};

class CheckboxBoolean extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  componentDidMount() {
    if (this.props.focusOnInit) this.input.focus();
    if (this.props.reference) this.props.reference(this.input);
  }

  render() {
    const {
      label,
      disabled,
      input,
      reference,
      focusOnInit,
      meta: { touched, error },
      ...otherProps
    } = this.props;
    const id = getControlId('checkbox', input.name);

    return (
      <div className="ctrl-checkbox">
        <label htmlFor={id}>{label}</label>
        <div>
          <input
            {...otherProps}
            {...input}
            type="checkbox"
            id={id}
            disabled={disabled}
            ref={node => {
              this.input = node;
            }}
            checked={input.value === true} // Handle boolean true/false for checkbox
            onChange={event => {
              input.onChange(event.target.checked); // Ensure to pass boolean true/false
            }}
          />
        </div>

        {touched && error && <span className="form-error">{error}</span>}
      </div>
    );
  }
}

export default CheckboxBoolean;
