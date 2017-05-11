import React from 'react';
import PropTypes from 'prop-types';

function Input({ input, label, type, meta: { touched, error, warning } }) {
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object,
};

Input.defaultProps = {
  meta: {},
};

export default Input;
