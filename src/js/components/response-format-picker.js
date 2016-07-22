import React, { PropTypes } from 'react'
import _ from 'lodash'
import {
  RESPONSE_FORMAT as resFormatMap
} from '../utils/constants-mapping'


import { RESPONSE_FORMAT } from '../constants/pogues-constants'

export default function ResponseFormatPicker(
  { format, select, locale }) {

  const formatChoices = _.map(RESPONSE_FORMAT, formatName => (
      <option key={formatName} value={formatName}>
        { locale[resFormatMap[formatName]]}
      </option>
  ))

  return (
      <div className="col-sm-6">
        <select className="form-control" value={format}
          onChange={e => select(e.target.value)}>
          { formatChoices }
        </select>
      </div>
  )
}

ResponseFormatPicker.propTypes = {
  select: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
}