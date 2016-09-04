import React, { Component, PropTypes } from 'react'
import QuestionLabel from './question-label'
import SequenceLabel from './sequence-label'
import ToolsActivator from './tools-activator'
import DeleteActivator from './delete-activator'

import classnames from 'classnames'

import { COMPONENT_TYPE } from '../constants/pogues-constants'
const { QUESTION, SEQUENCE } = COMPONENT_TYPE

export default function QuestionOrSequenceHeader(props) {
  const {
   type, isDragging, id, label, depth, connectDragSource,
   qrId, toggleActiveComponent, addPageBreak, hasPageBreak,
   flat, idToRank, removeAllowed, removeComponent
  } = props

  const cl = classnames(
    'header-container tools-activator-container',
    isDragging && 'drag')
  const Label = type === QUESTION ? QuestionLabel : SequenceLabel
  return (
    <div className={cl} >
      { !isDragging && 
        <ToolsActivator 
            id={id} 
            qrId={qrId} toggleActiveComponent={toggleActiveComponent} 
            addPageBreak={addPageBreak} hasPageBreak={hasPageBreak} /> }
      {connectDragSource(
        <span>
          <Label {...props} />
        </span>
      )}
      { !isDragging && 
        <DeleteActivator
          qrId={qrId} id={id} removeComponent={removeComponent}
          flat={flat} idToRank={idToRank} removeAllowed={removeAllowed}/> }
    </div>
  )
}

QuestionOrSequenceHeader.propTypes = {

}


