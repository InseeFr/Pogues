// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';

function Input({ input, label, type, required, reference, meta: { touched, error, warning } }) {
  return (
    <div className="ctrl-input">
      <label htmlFor={`input-${input.name}`}>{label}{required ? <span>*</span> : ''}</label>
      <div>
        <input {...input} ref={reference} id={`input-${input.name}`} placeholder={label} type={type} />
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-warm">{warning}</span>))}
      </div>
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  meta: PropTypes.object,
  reference: PropTypes.func,
};

Input.defaultProps = {
  required: false,
  meta: {},
  reference: undefined,
};

export default Input;
