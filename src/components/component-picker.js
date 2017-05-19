import React, { PropTypes } from 'react';

export default function ComponentPicker({ name, select, locale }) {
  return (
    <input value={name}
      onChange={e => select(e.target.value)}
      type="text" className="form-control" placeholder={locale.target}
      list="candidates" />
  );
}

ComponentPicker.propTypes = {
  name: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
