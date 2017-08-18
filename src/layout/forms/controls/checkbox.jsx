import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ input, label, type, required, reference, meta: { touched, error, warning } }) {
  return (
    <div className="form-check-inline">
      <label className="form-check-label" htmlFor={`input-${input.name}`}>
        <input checked={input.value} type="checkbox" {...input} id={`input-${input.name}`} />
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Checkbox.defaultProps = {
  required: false,
};

export default Checkbox;
