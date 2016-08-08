import React, { PropTypes } from 'react';
import Logger from '../logger/logger';
import _ from 'lodash'

import {
  DECLARATION_TYPE, DECLARATION_POSITION
} from '../constants/pogues-constants'
import { DECLARATION_POS as dclPosMap } from '../utils/constants-mapping'
var logger = new Logger('Declaration', 'Components');

function Declaration({ text, type, position, remove, edit, isQuestion, locale}) {
  const typeChoices =  Object.keys(DECLARATION_TYPE).map(key =>
     <option key={key} value={key}>{locale[key]}</option>)
     
  const posChoices =  _.map(DECLARATION_POSITION, pos => 
    <option key={pos} value={pos}>{locale[dclPosMap[pos]]}</option>
  )
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-10">
            <input value={text} type="text" className="form-control"
              onChange={e => edit({ text: e.target.value})}
              placeholder={locale.placeholderDeclarationText}/>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-default form-control" type="button"
              onClick={remove}>
              <span className="fa fa-trash"/>
            </button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6">
            <select onChange={e => edit({ type: e.target.value })}
               value={type} className="form-control input-block-level">
              {typeChoices}
            </select>
          </div>
          { isQuestion && 
          <div className="col-sm-6">
            <select onChange={e => edit({ position: e.target.value })}
               value={position} className="form-control input-block-level">
              {posChoices}
            </select>          
          </div>
        }
        </div>
      </div>
  )
}

Declaration.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string, // not required for sequences
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  isQuestion: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired
}
export default Declaration;
