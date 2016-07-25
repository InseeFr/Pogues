import React, { PropTypes } from 'react'
import className from 'classnames'

export default function EditCodeListButton({ edited, isSpec, toggle }) {
  const clEditable = className('fa', isSpec ?  'fa-eye' : 'fa-pencil')
  return (
    <span className="input-group-addon" onClick={toggle}>
     <span className={clEditable}></span>
   </span>
  )
}

EditCodeListButton.propTypes = {
  edited: PropTypes.bool.isRequired,
  isSpec: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}