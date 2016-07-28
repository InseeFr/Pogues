import React, { PropTypes } from 'react'
import _ from 'lodash'
import  { DATATYPE_VIS_HINT } from '../constants/pogues-constants'
const vizHintsToText = {
  [DATATYPE_VIS_HINT.CHECKBOX]: 'checkbox',
  [DATATYPE_VIS_HINT.RADIO]: 'radio',
  [DATATYPE_VIS_HINT.DROPDOWN]: 'dropdown'
}

export default function VisHintPicker(
  { visHint, select, disabled, locale }) {
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
          {
            _.map(DATATYPE_VIS_HINT, (hint, value) => {
              const text = vizHintsToText[value]
              return <option key={hint} value={value}>{text}</option>
            })
          }
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