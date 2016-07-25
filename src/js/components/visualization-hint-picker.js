import React, { PropTypes } from 'react'
import _ from 'lodash'
import  { DATATYPE_VIZ_HINT } from '../constants/pogues-constants'
const vizHintsToText = {
  [DATATYPE_VIZ_HINT.CHECKBOX]: 'checkbox',
  [DATATYPE_VIZ_HINT.RADIO]: 'radio',
  [DATATYPE_VIZ_HINT.DROPDOWN]: 'dropdown'
}

export default function VisualizationHintPicker({ visualizationHint, select,
  locale }) {
  return (
    <div className="form-group">
      <label htmlFor="visualizationHint" className="col-sm-3 control-label">
        {locale.visualizationHint}
      </label>
      <div className="col-sm-3">
        <select onChange={e => select(e.target.value)}
          className="form-control" value={visualizationHint}
          id="visualizationHint">
          {
            _.map(DATATYPE_VIZ_HINT, (hint, value) => {
              const text = vizHintsToText[value]
              return <option key={hint} value={value}>{text}</option>
            })
          }
        </select>
      </div>
    </div>
  )
}

VisualizationHintPicker.propTypes = {
  visualizationHint: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
}