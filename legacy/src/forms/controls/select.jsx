import { Component } from 'react';

import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import {
  getControlId,
  getValuesFromGenericOptions,
} from '../../utils/widget-utils';

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  emptyOption: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  focusOnInit: PropTypes.bool,
};

export const defaultProps = {
  required: false,
  disabled: false,
  multiple: false,
  children: [],
  emptyOption: undefined,
  focusOnInit: false,
};

// Control

class Select extends Component {
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
      multiple,
      emptyOption,
      children,
      input,
      meta: { touched, error },
    } = this.props;
    const values = getValuesFromGenericOptions(children);
    const id = getControlId('select', input.name);

    return (
      <div className="ctrl-select">
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          <select
            {...input}
            id={id}
            placeholder={label}
            disabled={disabled}
            multiple={multiple}
            ref={(node) => {
              this.input = node;
            }}
          >
            {emptyOption && <option value="">{emptyOption}</option>}
            {values.map((val) => {
              const { label, value, ...otherProps } = val;
              return (
                <option key={value} value={value} {...otherProps}>
                  {label}
                </option>
              );
            })}
          </select>

          {touched && error && <span className="form-error">{error}</span>}
        </div>
      </div>
    );
  }
}

export default Select;
