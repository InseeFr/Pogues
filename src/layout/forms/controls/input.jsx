// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

function Input({
  input,
  label,
  type,
  required,
  avoidSubmitOnEnter,
  reference,
  id,
  help,
  meta: { touched, pristine, error, warning },
}) {
  const customProps = {
    ref: reference,
    id: id !== '' ? `input-${input.id}` : `input-${input.name}`,
    placeholder: label,
    type,
  };

  if (avoidSubmitOnEnter) {
    customProps.onKeyPress = e => {
      e.key === 'Enter' && e.preventDefault();
    };
  }

  const helpBlock = help
    ? <span className="help-block">
        <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
      </span>
    : '';

  return (
    <div className="ctrl-input">
      <label htmlFor={customProps.id}>
        {label}
        {required ? <span>*</span> : ''}
        {helpBlock}
      </label>

      <div>
        <input {...input} {...customProps} />
        {!pristine &&
          touched &&
          ((error &&
            <span className="form-error">
              {error}
            </span>) ||
            (warning &&
              <span className="form-warm">
                {warning}
              </span>))}
      </div>
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  avoidSubmitOnEnter: PropTypes.bool,
  meta: PropTypes.object,
  reference: PropTypes.func,
  id: PropTypes.string,
  help: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  avoidSubmitOnEnter: true,
  meta: {},
  reference: undefined,
  id: '',
  help: false,
};

export default Input;
