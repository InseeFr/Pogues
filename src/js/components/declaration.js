import React, { PropTypes } from 'react';
import Logger from '../logger/logger';
import { DECLARATION_TYPE } from '../constants/pogues-constants'

var logger = new Logger('Declaration', 'Components');

function Declaration({ text, type, disjoignable, remove, edit, locale}) {
  const typeChoices =  Object.keys(DECLARATION_TYPE).map(key =>
     <option key={key} value={key}>{locale[key]}</option>)
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-12">
            <div className="input-group">
              <input value={text} type="text" className="form-control"
                onChange={e => edit({ text: e.target.value})}
                placeholder={locale.instruction}/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button"
                  onClick={remove}>
                  &times;
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6">
            <select onChange={e => edit({ type: e.target.value })}
               value={type} className="form-control input-block-level">
              {typeChoices}
            </select>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={disjoignable}
                    onChange={e => edit({ disjoignable: e.target.checked })} />
                    {locale.disjoignable}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

Declaration.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disjoignable: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
export default Declaration;
