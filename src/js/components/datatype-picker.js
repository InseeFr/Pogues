import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Logger from '../logger/logger';
import _ from 'lodash'

var logger = new Logger('DataTypePicker', 'Components');
import { DATATYPE_NAME } from '../constants/pogues-constants'

export default function DataTypePicker({ typeName, select, locale }) {
  const typeChoices =  _.map(DATATYPE_NAME, (type, val) =>
    <option value={val} key={type}>
      {locale[val]}
    </option>)

  return (
    <div className="form-group">
      <label htmlFor="format" className="col-sm-3 control-label">
        {locale.responseType}
      </label>
      <div className="col-sm-3">
        <select onChange={e => select(e.target.value)}
          value={typeName} className="form-control" id="format">
          {typeChoices}
        </select>
      </div>
    </div>
  );
}

DataTypePicker.propTypes = {
  typeName: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}