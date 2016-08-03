import React, { PropTypes } from 'react';
import { CONTROL_CRITICITY } from '../constants/pogues-constants'
import _ from 'lodash'

export default function Control({ id, description,
  expression, failMessage, criticity,
  remove, edit, locale }) {
  const criticityChoices =  Object.keys(CONTROL_CRITICITY).map(key =>
    <option key={key} value={key}>{locale[key]}</option>)
  return (
    <div>
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-10">
            <input type="text" value={description}
              placeholder={locale.description}
              className="form-control"
              onChange={e => edit({ description: e.target.value })}/>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-default form-control" type="button"
              onClick={remove}>
              <span className="fa fa-trash"/>
            </button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="text" value={expression}
              placeholder={locale.expression}
              className="form-control"
              onChange={e => edit({ expression: e.target.value })}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <textarea type="text" value={failMessage}
              placeholder={locale.failMessage}
              className="form-control"
              onChange={e => edit({ failMessage: e.target.value })}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-6 col-sm-6">
            <select value={criticity}
              placeholder={locale.failMessage}
              className="form-control"
              onChange={e => edit({ criticity: e.target.value })}>
              { criticityChoices }
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

Control.propTypes = {
  expression: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  failMessage: PropTypes.string.isRequired,
  criticity: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
}