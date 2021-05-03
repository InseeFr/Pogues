import React from 'react';

const Dropdown = ({ onChange, value, options }) => (
  <select onChange={e => onChange(e.target.value)} value={value} id="STAMPS">
    <option value="" />
    {options.map(s => (
      <option key={s.id} value={s.id}>
        {s.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
