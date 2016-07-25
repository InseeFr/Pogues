import React from 'react';
import  { DATATYPE_VIZ_HINT } from '../constants/pogues-constants'

//TODO internationalization + make constants
const vizHintsToText = {
  [DATATYPE_VIZ_HINT.CHECKBOX]: 'checkbox',
  [DATATYPE_VIZ_HINT.RADIO]: 'radio',
  [DATATYPE_VIZ_HINT.DROPDOWN]: 'dropdown'
}

// TODO things like this.state._minimum are ugly, but with this
// convention, we can benefit from the very covenient constructors
// form object literals. maybe we should
export default function NumericDatatypeEditor(
    { datatype: { minimum, maximum, decimals, visualizationHint },
    edit, locale }) {
//pattern and maxLength
  return (
    <div>
      <div className="form-group">
        <label htmlFor="minimum" className="col-sm-2 control-label">
          {locale.minimum}
        </label>
        <div className="col-sm-2">
          <input value={minimum}
            onChange={e => edit({ minimum: e.target.value })}
            type="number" className="form-control" id="length"
            placeholder={locale.minimum}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="maximum" className="col-sm-2 control-label">
          {locale.maximum}
        </label>
        <div className="col-sm-2">
          <input value={maximum}
            onChange={e => edit({ maximum: e.target.value })}
            type="number" className="form-control" id="maximum"
            placeholder={locale.maximum}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="decimals" className="col-sm-2 control-label">
          {locale.decimals}
        </label>
        <div className="col-sm-2">
          <input value={decimals}
            onChange={e => edit({ decimals: e.target.value })}
            type="number" className="form-control" id="minimum"
            placeholder={locale.decimals}/>
        </div>
      </div>
    </div>
  );
}
