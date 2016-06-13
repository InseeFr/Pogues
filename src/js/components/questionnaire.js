//TODO Divide into a container component and a presentational component


import React, { PropTypes } from 'react';
import QuestionnaireOutlook from './questionnaire-outlook';
import QuestionOrSequence from './question-or-sequence'
import GenericInput from '../components/generic-input';
import classNames from 'classnames';
import { COMPONENT_TYPE } from '../constants/pogues-constants'

const { QUESTION, SEQUENCE, GENERIC_INPUT } = COMPONENT_TYPE

import { 
  toggleActiveComponent, createComponent, removeComponent
} from '../actions/component'

import Logger from '../logger/logger'
import { connect } from 'react-redux'

var logger = new Logger('Questionnaire', 'Components');



//It's easier to take care of recursion here than in the questionOrSequence
//component since we can put the GenericInput at the right place more easily.

const childCmpntsAndGenericInput = (childCmpntsFromParent, props) =>
  childCmpntsFromParent.map(child => {
    if (child === GENERIC_INPUT) return <GenericInput key={GENERIC_INPUT}/>
    const { id, active, label, depth, highlighted, type, childCmpnts } = child
    const children = childCmpnts ?
      childCmpntsAndGenericInput(childCmpnts, props) : null
    return (
      <QuestionOrSequence {...props} // utility functions from parent
        key={id}
        id={id} active={active} label={label} highlighted={highlighted}
        type={type} depth={depth}
        children={children} />
      )
  })

//TODO We could try to connect each QuestionOrSequence to the store in order to
//avoid useless re-rendering of sequences when the generic input position
//changes but without impacting the sequence
export default function Questionnaire(props) {

  const { qr, locale } = props
  let invite = locale.introduction
  
  return (
    <div className="container bs-docs-container">
      <div className="row">
        <div className="col-md-9">
          <h1>{ invite }</h1>
          <div className="questionnaire">
            { childCmpntsAndGenericInput(qr, props) }
          </div>
        </div>
        <div className="col-md-3">
          <QuestionnaireOutlook childCmpnts={qr}/>
        </div>
      </div>
    </div>
  )
}


Questionnaire.propTypes = {
  qrId: PropTypes.string.isRequired,
  createComponent: PropTypes.func.isRequired,
  structure: PropTypes.object.isRequired,
  toggleActiveComponent: PropTypes.func.isRequired,
  qr: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired 
}



