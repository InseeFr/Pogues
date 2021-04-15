import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import { getControlId, getValuesFromGenericOptions } from 'utils/widget-utils';

import { CONTROL_LIST_RADIOS } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_LIST_RADIOS;

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  noValuesMessage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export const defaultProps = {
  required: false,
  disabled: false,
  children: [],
  noValuesMessage: undefined,
};

// Component

class ListRadios extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const {
      label,
      required,
      disabled,
      noValuesMessage,
      children,
      input,
      meta: { touched, error },
    } = this.props;
    const values = getValuesFromGenericOptions(children);

    return (
      <div className={COMPONENT_CLASS}>
        <label
          htmlFor={getControlId(
            'radios',
            input.name,
            values[0] && values[0].value,
          )}
        >
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          {/* No values */}
          {values.length === 0 && noValuesMessage && (
            <div>
              <span>{noValuesMessage}</span>
            </div>
          )}

          {values.map(val => {
            // eslint-disable-next-line no-shadow
            const { label, value, ...otherProps } = val;
            const id = getControlId('radios', input.name, value);

            return (
              <label key={id} htmlFor={id} className="radio-inline">
                <input
                  {...otherProps}
                  type="radio"
                  name={input.name}
                  id={id}
                  value={value}
                  disabled={disabled}
                  checked={input.value === value}
                  onChange={input.onChange}
                />

                {label}
              </label>
            );
          })}
          {touched && error && <span className="form-error">{error}</span>}
        </div>
      </div>
    );
  }
}

export default ListRadios;
