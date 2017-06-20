import React, { PropTypes } from 'react';

export default function TextDatatypeEditor(
  { datatype: { maxLength, pattern }, edit, locale }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="length" className="col-sm-5 control-label">
          {locale.maxLength}
        </label>
        <div className="col-sm-2">
          <input value={maxLength} type="number"
                 className="form-control" id="length"
                 placeholder={locale.maxLength}
                 onChange={e => edit({ maxLength: e.target.value })}
                 id="length"/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="length" className="col-sm-5 control-label">
          {locale.pattern}
        </label>
        <div className="col-sm-5">
          <input type="text" value={pattern} 
                className="form-control" id="pattern"
                placeholder={locale.pattern}
                onChange={e => edit({ pattern: e.target.value })}
                id="pattern"/>
        </div>
      </div>
    </div>
  )
}

TextDatatypeEditor.propTypes = {
  datatype: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
