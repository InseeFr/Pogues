import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { DATATYPE_NAME } from 'constants/pogues-constants';

function DataTypePicker({ typeName, select, locale }) {
  const typeChoices = _.map(DATATYPE_NAME, (type, val) => (
    <option value={val} key={type}>
      {locale[val]}
    </option>
  ));

  return (
    <select onChange={e => select(e.target.value)} value={typeName} className="form-control" id="format">
      {typeChoices}
    </select>
  );
}

DataTypePicker.propTypes = {
  typeName: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
};

export default DataTypePicker;
