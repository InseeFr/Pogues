import React, { Children } from 'react';
import { fieldInputPropType, fieldMetaPropType } from 'redux-form';

import PropTypes from 'prop-types';

// Proptypes and defaultProps

export const propTypes = {
  ...fieldInputPropType,
  ...fieldMetaPropType,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
};

export const defaultProps = {
  required: false,
  disabled: false,
  children: [],
};

// Component

function ListRadioButtons({ label, required, disabled, children, input, meta: { touched, error } }) {
  return (
    <div className="ctrl-list-radios-buttons">
      <label htmlFor={`radio-${input.name}`}>
        {label}
        {required ? <span className="ctrl-required">*</span> : ''}
      </label>
      <div>
        {Children.map(children, (item, index) => {
          const { children: radioLabel, value, ...otherProps } = item.props;
          const idRadio = `radio-${input.name}-${value}`;
          return (
            <div className="form-check-inline" key={`radio-${value}`}>
              <label htmlFor={idRadio} className="form-check-label">
                <input
                  {...otherProps}
                  type="radio"
                  name={input.name}
                  id={idRadio}
                  value={value}
                  onChange={input.onChange}
                  disabled={disabled}
                  checked={input.value === value || (!input.value && required && index === 0)}
                />
                {radioLabel}
              </label>
            </div>
          );
        })}
        {touched && (error && <span className="form-error">{error}</span>)}
      </div>
    </div>
  );
}

ListRadioButtons.propTypes = propTypes;
ListRadioButtons.defaultProps = defaultProps;

export default ListRadioButtons;
