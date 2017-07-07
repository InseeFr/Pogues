// @TODO: Create tests

import React from 'react';
import PropTypes from 'prop-types';

function ListRadioButtons({ input, label, radios, required, id }) {
  const listRadios = radios.map((op, index) => {
    let checked = '';
    const idRadio = id !== '' ? `radio-${id}-${op.value}` : `radio-${input.name}-${op.value}`;

    if (input.value === op.value || (input.value === '' && required && index === 0)) {
      checked = true;
    }

    return (
      <div className="form-check-inline" key={`radio-${op.value}`}>
        <label htmlFor={idRadio} className="form-check-label">
          <input
            checked={checked}
            type="radio"
            name={input.name}
            id={idRadio}
            value={op.value}
            onChange={input.onChange}
          />
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
  id: PropTypes.string,
};

ListRadioButtons.defaultProps = {
  radios: false,
  required: false,
  id: '',
};

export default ListRadioButtons;
