import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

function EditCodeListButton({ edited, isSpec, toggle }) {
  let icon = '';

  if (edited) {
    if (isSpec) {
      icon = 'fa-check';
    } else {
      icon = 'fa-save';
    }
  } else if (isSpec) {
    icon = 'fa-eye';
  } else {
    icon = 'fa-pencil';
  }

  const clEditable = className('fa', icon);
  // `toggle` can take a boolean as argument (in fact it is a toggle or set
  // function), so we should take of not passing the event to it.
  return (
    <span className="input-group-addon" onClick={() => toggle()}>
      <span className={clEditable} />
    </span>
  );
}

EditCodeListButton.propTypes = {
  edited: PropTypes.bool.isRequired,
  isSpec: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default EditCodeListButton;
