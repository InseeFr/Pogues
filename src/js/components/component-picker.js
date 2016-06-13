import React, { PropTypes } from 'react';

export default function ComponentPicker({ label, select, locale }) {
  return (
    <input value={label}
      onChange={e => select(e.target.value)}
      type="text" className="form-control" placeholder={locale.target}
      list="candidates" />
  );
}

ComponentPicker.propTypes = {
  label: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
