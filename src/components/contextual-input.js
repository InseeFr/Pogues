import React, { PropTypes } from 'react'
import { GENERAL } from '../constants/pogues-constants'

const { ENTER_KEY_CODE } = GENERAL

export default function ContextualInput(
  { className, text, placeholder, onChange, onEnter }) {

  return (
    <input type="text" value={text} placeholder={placeholder}
           className={className} onChange={e => onChange(e.target.value)}
           onKeyDown={e => {
             if (e.keyCode === ENTER_KEY_CODE) {
               e.preventDefault();
               onEnter(e.target.value);
             } 
           }} />
  )
}

ContextualInput.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
  