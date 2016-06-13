import React, { PropTypes } from 'react';
import Target from './target'
import Logger from '../logger/logger';
import { GOTO_CONSISTENCY} from '../constants/pogues-constants'

const { AFTER, BEFORE, NON_EXISTING } = GOTO_CONSISTENCY

var logger = new Logger('GoTo', 'Components');

function GoToDeleteButton({ remove, locale }) {
  return (
    <button type="button" className="btn btn-danger"
      onClick={remove}>
      {locale.deleteGoTo}
    </button>
  )
}

GoToDeleteButton.propTypes = {
  remove: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

//TODO see how to deal with components with an empty label : it breaks the 
//component picker since we cannot differentiate the selection of an empty
//label component from the situation where no label has be typed in for the
//goTo. And if we allow the label to be `null` (to differentiate it from ''),
//we encounter that kind of error :
//ReactDOMInput.js:132 Warning: ComponentPicker is changing a uncontrolled
//input of type text to be controlled. Input elements should not switch from
//uncontrolled to controlled (or vice versa). Decide between using a controlled
//or uncontrolled input element for the lifetime of the component. 
//since `null` as a value is handled as if there is no value given.

export default function GoTo(
  { after, before, description, expression,
    ifTrueLabel, ifTrueStatus,
    ifFalseLabel, ifFalseStatus,
    edit, remove, changeTargetTrue, changeTargetFalse,
    locale }) {
 
  
  return (
    <div>
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-12">
            <input type="text" value={description}
              placeholder={locale.description}
              className="form-control"
              onChange={e => edit({ description: e.target.value })}/>
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
        <Target text={locale.ifTrue} label={ifTrueLabel || ''}
          status={ifTrueStatus}
          select={val => changeTargetTrue(val)} locale={locale} />
        <Target text={locale.ifFalse} label={ifFalseLabel || ''}
          status={ifFalseStatus}
          select={val => changeTargetFalse(val)} locale={locale} />
      </div>
      <GoToDeleteButton remove={remove} locale={locale} />
    </div>
  )
}

GoTo.propTypes = {
  ifTrueLabel: PropTypes.string, // can be null`
  ifTrueStatus: PropTypes.string.isRequired,
  ifFalseLabel: PropTypes.string, // can be `null`
  ifFalseStatus: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  changeTargetTrue: PropTypes.func.isRequired,
  changeTargetFalse: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  expression: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  after: PropTypes.array.isRequired,
  before: PropTypes.array.isRequired
}