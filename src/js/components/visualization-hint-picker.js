import React, { PropTypes } from 'react'
import _ from 'lodash'
import  { DATATYPE_VIZ_HINT } from '../constants/pogues-constants'
const vizHintsToText = {
  [DATATYPE_VIZ_HINT.CHECKBOX]: 'checkbox',
  [DATATYPE_VIZ_HINT.RADIO]: 'radio',
  [DATATYPE_VIZ_HINT.DROPDOWN]: 'dropdown'
}

export default function VisualizationHintPicker({ visualizationHint, edit }) {
  return (
    <div className="col-sm-3">
      <select onChange={e => edit(e.target.value)}
            className="form-control"
            value={visualizationHint}>
        {
          _.map(DATATYPE_VIZ_HINT, (hint, value) => {
            const text = vizHintsToText[value]
            return <option key={hint} value={value}>{text}</option>
          })
        }
      </select>
    </div>
  )
}

VisualizationHintPicker.propTypes = {
  visualizationHint: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired
}