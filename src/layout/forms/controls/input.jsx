// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';

function Input({ input, label, type, required, reference, id, meta: { touched, error, warning } }) {
  const idInput = id !== '' ? `input-${input.id}` : `input-${input.name}`;

  return (
    <div className="ctrl-input">
      <label htmlFor={idInput}>{label}{required ? <span>*</span> : ''}</label>
      <div>
        <input {...input} ref={reference} id={idInput} placeholder={label} type={type} />
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
  id: PropTypes.string,
};

Input.defaultProps = {
  required: false,
  meta: {},
  reference: undefined,
  id: '',
};

export default Input;
