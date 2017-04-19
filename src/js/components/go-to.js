import React, { PropTypes } from 'react';
import Target from './target'

//TODO see how to deal with components with an empty label : it breaks the
//component picker since we cannot differentiate the selection of an empty
//label component from the situation where no label has been typed in for the
//goTo. And if we allow the label to be `null` (to differentiate it from ''),
//we encounter that kind of error :
//ReactDOMInput.js:132 Warning: ComponentPicker is changing a uncontrolled
//input of type text to be controlled. Input elements should not switch from
//uncontrolled to controlled (or vice versa). Decide between using a controlled
//or uncontrolled input element for the lifetime of the component.
//since `null` as a value is handled as if there is no value given.

//TODO rely on integrity checker to deal with errors

export default function GoTo(
  { description, expression,
    ifTrueName, ifTrueStatus,
    edit, remove, changeTarget,
    locale }) {


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
        <Target text={locale.ifCondition} name={ifTrueName || ''}
          status={ifTrueStatus}
          select={val => changeTarget(val)} locale={locale} />
      </div>
    </div>
  )
}

GoTo.propTypes = {
  ifTrueName: PropTypes.string, // can be null`
  ifTrueStatus: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  changeTarget: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  expression: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  after: PropTypes.array.isRequired,
  before: PropTypes.array.isRequired
}