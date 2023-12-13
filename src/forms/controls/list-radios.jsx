import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import {
  getControlId,
  getValuesFromGenericOptions,
} from '../../utils/widget-utils';
import { CONTROL_LIST_RADIOS } from '../../constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_LIST_RADIOS;

function ListRadios({
  label,
  required,
  disabled,
  noValuesMessage,
  children,
  input,
  meta: { touched, error },
}) {
  const values = getValuesFromGenericOptions(children);

  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={getControlId('radios', input.name, values[0]?.value)}>
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
          const { label: radioLabel, value, ...otherProps } = val;
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
              {radioLabel}
            </label>
          );
        })}
        {touched && error && <span className="form-error">{error}</span>}
      </div>
    </div>
  );
}

ListRadios.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  noValuesMessage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

ListRadios.defaultProps = {
  required: false,
  disabled: false,
  children: [],
  noValuesMessage: undefined,
};

export default ListRadios;
