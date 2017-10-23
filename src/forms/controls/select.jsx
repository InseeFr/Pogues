import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import { getControlId, getValuesFromGenericOptions } from 'utils/widget-utils';
import { CONTROL_SELECT } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_SELECT;

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
};

export const defaultProps = {
  required: false,
  disabled: false,
  multiple: false,
  children: [],
  emptyOption: undefined,
};

// Component

function Select({ label, required, disabled, multiple, emptyOption, children, input, meta: { touched, error } }) {
  const values = getValuesFromGenericOptions(children);
  const id = getControlId('select', input.name);

  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <select {...input} id={id} placeholder={label} disabled={disabled} multiple={multiple}>
          {emptyOption && <option value="">{emptyOption}</option>}
          {values.map(val => {
            // eslint-disable-next-line no-shadow
            const { label, value, ...otherProps } = val;
            return (
              <option key={value} value={value} {...otherProps}>
                {label}
              </option>
            );
          })}
        </select>

        {touched && (error && <span className="form-error">{error}</span>)}
      </div>
    </div>
  );
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
