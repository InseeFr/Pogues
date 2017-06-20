import React from 'react';

// TODO things like this.state._minimum are ugly, but with this
// convention, we can benefit from the very covenient constructors
// form object literals. maybe we should
export default function NumericDatatypeEditor(
    { datatype: { minimum, maximum, decimals },
    edit, locale }) {
//pattern and maxLength
  return (
    <div>
      <div className="form-group">
        <label htmlFor="minimum" className="col-sm-5 control-label">
          {locale.minimum}
        </label>
        <div className="col-sm-5">
          <input value={minimum}
            onChange={e => edit({ minimum: e.target.value })}
            type="number" className="form-control" id="minimum"
            placeholder={locale.minimum}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="maximum" className="col-sm-5 control-label">
          {locale.maximum}
        </label>
        <div className="col-sm-5">
          <input value={maximum}
            onChange={e => edit({ maximum: e.target.value })}
            type="number" className="form-control" id="maximum"
            placeholder={locale.maximum}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="decimals" className="col-sm-5 control-label">
          {locale.decimals}
        </label>
        <div className="col-sm-5">
          <input value={decimals}
            onChange={e => edit({ decimals: e.target.value })}
            type="number" className="form-control" id="minimum"
            placeholder={locale.decimals}/>
        </div>
      </div>
    </div>
  );
}
