import React, { PropTypes } from 'react'
import classnames from 'classnames'

const icons = {
  BOLD: 'bold',
  ITALIC: 'italic',
  LINK: 'link',
  INFO: 'question'
}   
 
export default function RichControl({ identifier, toggle, isSet }){
  return (
    <a className={classnames('btn btn-default', { active: isSet })}
       onMouseDown={e => {
         e.preventDefault()
         toggle()
       }} >
      <i className={`fa fa-${icons[identifier]}`}></i>
    </a>
  )
}

RichControl.propTypes = {
    identifier: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    isSet: PropTypes.bool.isRequired
}