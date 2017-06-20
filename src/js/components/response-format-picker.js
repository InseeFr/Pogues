import React, { PropTypes } from 'react'
import _ from 'lodash'
import {
  QUESTION_TYPE_ENUM as qtMap
} from '../utils/constants-mapping'


export default function ResponseFormatPicker(
  { type, types, select, locale }) {

  const typeChoices = _.map(types, typeName => (
      <option key={typeName} value={typeName}>
        { locale[qtMap[typeName]]}
      </option>
  ))

  return (
    <select className="form-control" value={type}
      onChange={e => select(e.target.value)}>
      { typeChoices }
    </select>
  )
}

ResponseFormatPicker.propTypes = {
  select: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  types: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
}