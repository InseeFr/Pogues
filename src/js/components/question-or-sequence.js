import React, { Component, PropTypes } from 'react'
import QuestionLabel from './question-label'
import SequenceLabel from './sequence-label'
import ToolsActivator from './tools-activator'
import { COMPONENT_TYPE } from '../constants/pogues-constants'
import ComponentEditor from './component-editor'
const { QUESTION, SEQUENCE } = COMPONENT_TYPE

function QuestionOrSequence(props) {
  const { structure, id, active, label, depth, type, highlighted, children } = props
  
  if (active) return <ComponentEditor structure={structure} id={id} />
  const isSequence = type === SEQUENCE
  const labelEl = isSequence ?
    <SequenceLabel highlighted={highlighted} label={label} depth={depth} /> :
    <QuestionLabel highlighted={highlighted} label={label} />

  return (
    <div>
      <div className="tools-activator-container">
        {/* visible only when we are over QuestionOrSequenceLabel */}
        <ToolsActivator {...props} /> 
        {labelEl}
      </div>
      <div className={isSequence ? 'sequence' : '' }>
        {children}
      </div>
    </div>
  )
}

QuestionOrSequence.propTypes = {
  depth: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  qrId: PropTypes.string.isRequired,
  structure: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired, //id used by tools activator
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  highlighted: PropTypes.bool.isRequired,
  createComponent: PropTypes.func.isRequired,
  toggleActiveComponent: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  removeAllowed: PropTypes.bool.isRequired
  // moveComponentUp: PropTypes.func.isRequired,
  // moveComponentDown: PropTypes.func.isRequired,
}

export default QuestionOrSequence