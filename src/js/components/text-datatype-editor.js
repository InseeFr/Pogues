import React, { PropTypes, Component } from 'react';
import  { DATATYPE_VIZ_HINT } from '../constants/pogues-constants'

//TODO internationalization + make constants
const vizHintsToText = {
  [DATATYPE_VIZ_HINT.CHECKBOX]: 'checkbox',
  [DATATYPE_VIZ_HINT.RADIO]: 'radio',
  [DATATYPE_VIZ_HINT.DROPDOWN]: 'dropdown'
}

export default function TextDatatypeEditor(
  { datatype: { maxLength, pattern, visualizationHint },
    edit, locale }) {
  return (
    <div>
      <div className="col-sm-2">
        <input value={maxLength} type="number"
               className="form-control" id="length"
               placeholder={locale.maxLength}
               onChange={e => edit({ maxLength: e.target.value })}/>
      </div>
      <div className="col-sm-3">
        <input type="text" value={pattern} 
              className="form-control" id="pattern"
              placeholder={locale.pattern}
              onChange={e => edit({ pattern: e.target.value })}/>
      </div>
      <div className="col-sm-3">
        <select onChange={e => edit({ visualizationHint: e.target.value })}
              className="form-control"
              value={visualizationHint}>
          {
            Object.keys(DATATYPE_VIZ_HINT).map(hint => {
              const val = DATATYPE_VIZ_HINT[hint]
              const text = vizHintsToText[hint]
              return <option key={hint} value={val}>{text}</option>
            })
          }
        </select>
      </div>
    </div>
  )
}

TextDatatypeEditor.propTypes = {
  datatype: PropTypes.object.isRequired,
  // maxLength: PropTypes.number.isRequired,
  // pattern: PropTypes.string.isRequired,
  // visualizationHint: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
