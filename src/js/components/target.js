import React, { PropTypes } from 'react'
import ComponentPicker from './component-picker'
import classNames from 'classnames'
import { GOTO_CONSISTENCY } from '../constants/pogues-constants'

const { AFTER, BEFORE, NON_EXISTING } = GOTO_CONSISTENCY

export default function Target({ name, text, status, select, locale }) {

  const divCn = classNames({
    'form-group': true,
    'has-feedback': true,
    'has-success': status === AFTER,
    'has-warning': status === NON_EXISTING,
    'has-error': status === BEFORE
  })
  const spanCn = classNames({
    'glyphicon': true,
    'form-control-feedback': true,
    'glyphicon-ok': status === AFTER,
    'glyphicon-warning-sign': status === NON_EXISTING,
    'glyphicon-remove': status === BEFORE
  })
  return (
    <div className={divCn}>
      <label className="col-sm-4 control-label">{text}</label>
      <div className="col-sm-8">
        <ComponentPicker name={name} select={select} locale={locale}/>
        <span className={spanCn} aria-hidden="true"></span>
      </div>
    </div>
  );
}

Target.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}
