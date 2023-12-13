import React from 'react';

import { WIDGET_DROPDOWN } from '../../constants/dom-constants';

const { COMPONENT_CLASS, SELECT_CLASS } = WIDGET_DROPDOWN;

const Dropdown = ({ onChange, value, options }) => (
  <div className={COMPONENT_CLASS}>
    <select
      onChange={e => onChange(e.target.value)}
      value={value}
      id="STAMPS"
      className={SELECT_CLASS}
    >
      <option value="" />
      {options.map(s => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
