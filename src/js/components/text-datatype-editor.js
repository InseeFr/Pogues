import React, { PropTypes, Component } from 'react';
import  { DATATYPE_VIZ_HINT } from '../constants/pogues-constants'

//TODO internationalization + make constants
const vizHintsToText = {
  [DATATYPE_VIZ_HINT.CHECKBOX]: 'checkbox',
  [DATATYPE_VIZ_HINT.RADIO]: 'radio',
  [DATATYPE_VIZ_HINT.DROPDOWN]: 'dropdown'
}

export default function TextDatatypeEditor(
  { datatype: { maxLength, pattern }, edit, locale }) {
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
    </div>
  )
}

TextDatatypeEditor.propTypes = {
  datatype: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
