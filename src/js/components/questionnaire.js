//TODO Divide into a container component and a presentational component
import React, { PropTypes, Component } from 'react';
import QuestionnaireOutlook from './questionnaire-outlook';
import QuestionOrSequence from './question-or-sequence'
import IntegrityControl from './integrity-control'
import GenericInput from '../components/generic-input';
import classNames from 'classnames';
import { COMPONENT_TYPE } from '../constants/pogues-constants'
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

const { QUESTION, SEQUENCE, GENERIC_INPUT } = COMPONENT_TYPE

import {
  toggleActiveComponent, createComponent, removeComponent, moveComponent

} from '../actions/component'

import Logger from '../logger/logger'
import { connect } from 'react-redux'

var logger = new Logger('Questionnaire', 'Components');

//It's easier to take care of recursion here than in the questionOrSequence
//component since we can put the GenericInput at the right place more easily.
// Only the first sequence will have isFirst set to true
const childCmpntsAndGenericInput =
  (childCmpntsFromParent, props, path, first=true) => {

    let mightBeFirstSequence = first
    return childCmpntsFromParent.map((child, i) => {
      if (child === GENERIC_INPUT) return <GenericInput key={GENERIC_INPUT}/>
      const { 
        id, active, label, depth, highlighted, type, childCmpnts, hasPageBreak
      } = child
      const isFirstSequence = mightBeFirstSequence && type === SEQUENCE
      mightBeFirstSequence = mightBeFirstSequence && !isFirstSequence
      const children = childCmpnts ?
        childCmpntsAndGenericInput(
          childCmpnts, props, path + '.' + i, false) : null

      return (
        <QuestionOrSequence {...props} // utility functions from parent
          key={id}
          hasPageBreak={hasPageBreak}
          id={id} active={active} label={label} highlighted={highlighted}
          type={type} depth={depth}
          children={children} path={path + '.' + i}
          removeAllowed={!isFirstSequence} />
        )
    })
  }


//TODO We could try to connect each QuestionOrSequence to the store in order to
//avoid useless re-rendering of sequences when the generic input position
//changes but without impacting the sequence
class Questionnaire extends Component {
  render() {
    const { qr, locale } = this.props
    let invite = locale.introduction
    return (
      <div className="container bs-docs-container">
        <div className="row">
          <IntegrityControl />
        </div>
        <div className="row">
          <div className="col-md-9">
            <h1>{ invite }</h1>
            <div className="questionnaire">
              { childCmpntsAndGenericInput(qr, this.props, '0') }
            </div>
          </div>
          <div className="col-md-3">
            <QuestionnaireOutlook childCmpnts={qr}/>
          </div>
        </div>
      </div>
    )
  }
}


Questionnaire.propTypes = {
  qrId: PropTypes.string.isRequired,
  createComponent: PropTypes.func.isRequired,
  structure: PropTypes.object.isRequired,
  removeComponent: PropTypes.func.isRequired,
  moveComponent: PropTypes.func.isRequired,
  addPageBreak: PropTypes.func.isRequired,
  removePageBreak: PropTypes.func.isRequired,
  // moveComponentUp: PropTypes.func.isRequired,
  // moveComponentDown: PropTypes.func.isRequired,
  toggleActiveComponent: PropTypes.func.isRequired,
  qr: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired
}


export default DragDropContext(HTML5Backend)(Questionnaire)



