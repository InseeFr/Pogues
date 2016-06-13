import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Logger from '../logger/logger';

var logger = new Logger('DataTypePicker', 'Components');
import { DATATYPE_NAME } from '../constants/pogues-constants'

export default function DataTypePicker({ typeName, select, locale }) {
  const typeChoices =  Object.keys(DATATYPE_NAME).map(type => 
    <option value={DATATYPE_NAME[type]} key={type}>
      {locale[DATATYPE_NAME[type]]}
    </option>)

  return (
    <div>
      <div className="col-sm-3">
        <select onChange={e => select(e.target.value)}
          value={typeName} className="form-control">
          {typeChoices}
        </select>
      </div>
    </div>
  );
}

