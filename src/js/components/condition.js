import React, { PropTypes } from 'react';
import { CONTROL_CRITICITY } from '../constants/pogues-constants'
import _ from 'lodash'
import RichLabel from './rich-label'

export default function Condition({ id, condition, label,
  remove, edit, locale }) {
  return (
    <div>
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-10">
            <input type="text" value={condition}
              placeholder={locale.expression}
              className="form-control"
              onChange={e => edit({ condition: e.target.value })}/>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-default form-control" type="button"
              onClick={remove}>
              <span className="fa fa-trash"/>
            </button>
          </div>
        </div>
        <div className="form-group rich-label-form-group">
          <div className="col-sm-12">
            <RichLabel placeholder={locale.label}
              initialValue={label}
              canPaste={true}
              multiline={false}
              onChange={label => edit({ label })}/>
          </div>
        </div>
      </div>
    </div>
  )
}

Condition.propTypes = {
  condition: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}