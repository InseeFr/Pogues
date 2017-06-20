import React, { PropTypes } from 'react'
import className from 'classnames'

export default function EditCodeListButton({ edited, isSpec, toggle }) {
  const clEditable = className('fa',
    edited ? isSpec ?  'fa-check' : 'fa-save' :
             isSpec ?  'fa-eye' : 'fa-pencil'
  )
  // `toggle` can take a boolean as argument (in fact it is a toggle or set
  // function), so we should take of not passing the event to it.
  return (
    <span className="input-group-addon" onClick={() => toggle()}>
     <span className={clEditable}></span>
   </span>
  )
}

EditCodeListButton.propTypes = {
  edited: PropTypes.bool.isRequired,
  isSpec: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}