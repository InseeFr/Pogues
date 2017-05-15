// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';

function ListRadioButtons({ input, label, radios, required }) {
  const listRadios = radios.map(op => {
    return (
      <div className="form-check-inline">
        <label htmlFor={`radio-${op.value}`} className="form-check-label">
          <input type="radio" name={input.name} id={`radio-${op.value}`} value={op.value} onChange={input.onChange} />
          {op.label}
        </label>
      </div>
    );
  });

  return (
    <div className="ctrl-list-radios-buttons">
      <label htmlFor={`radio-${radios[0].value}`}>{label}{required ? <span>*</span> : ''}</label>
      <div>{listRadios}</div>
    </div>
  );
}

ListRadioButtons.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  radios: PropTypes.array,
  required: PropTypes.bool,
};

ListRadioButtons.defaultProps = {
  radios: false,
  required: false,
};

export default ListRadioButtons;
