// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ input, label, type, required, reference, meta: { touched, error, warning } }) {
  return (
    <div className="form-check-inline">
      <label className="form-check-label" htmlFor={`input-${input.name}`}>
        <input type="checkbox" {...input} id={`input-${input.name}`} />
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  required: false,
};

export default Checkbox;
