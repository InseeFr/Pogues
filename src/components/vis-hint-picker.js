import React, { PropTypes } from 'react'
import _ from 'lodash'
import  { DATATYPE_VIS_HINT } from '../constants/pogues-constants'
import { DATATYPE_VIS_HINT as visHintMap } from '../utils/constants-mapping'

export default function VisHintPicker(
  { visHint, select, disabled, locale }) {
    
  const visHintChoices = _.map(DATATYPE_VIS_HINT, visHint => (
    <option key={visHint} value={visHint}>{locale[visHintMap[visHint]]}</option>
  ))
  
  return (
    <div className="form-group">
      <label htmlFor="visHint" className="col-sm-5 control-label">
        {locale.visHint}
      </label>
      <div className="col-sm-4">
        <select onChange={e => select(e.target.value)}
          disabled={disabled}
          className="form-control" value={visHint}
          id="visHint">
          { visHintChoices }
        </select>
      </div>
    </div>
  )
}

VisHintPicker.propTypes = {
  visHint: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  locale: PropTypes.object.isRequired
}