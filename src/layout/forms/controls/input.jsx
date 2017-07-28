// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

function Input({ input, label, type, required, reference, id, help, meta: { touched, error, warning } }) {
  const idInput = id !== '' ? `input-${input.id}` : `input-${input.name}`;

  const helpBlock = help
    ? <span className="help-block">
        <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
      </span>
    : '';

  return (
    <div className="ctrl-input">
      <label htmlFor={idInput}>
        {label}{required ? <span>*</span> : ''}
        {helpBlock}
      </label>

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
  help: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  meta: {},
  reference: undefined,
  id: '',
  help: false,
};

export default Input;
