import React from 'react'
import CodeListSelector from './code-list-selector'
import CodeListEditor from './code-list-editor'

//TODO handle `edited` in the reducer ; needs to define where to store this
//information (a code list can be edited in multiple places, so it's not
//trivial to store in the reducer the 'position' of a code list that is
//currently edited). For instance : code list used as the `second measure`
//in the question which accepts a TABLE response.

export default function ({ id, disabled, select, create, locale, edited },
    toggleOrSet) {
  return {
    codeListSelector: <CodeListSelector id={id} select={select} 
    disabled={disabled} 
    edited={edited}
    create={() => {
      toggleOrSet(true)
      create()
    }}
    toggle={toggleOrSet}
    locale={locale} /> ,
    codeListEditor: id && edited ?
      <CodeListEditor id={id}  locale={locale} /> :
      null
  }
}