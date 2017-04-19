//TODO Divide into a container component and a presentational component

import React, { Component, PropTypes } from 'react';
import { COMPONENT_TYPE } from '../constants/pogues-constants'
import Questionnaire from './questionnaire'
import { flatten } from '../utils/data-utils'

const { SEQUENCE, GENERIC_INPUT } = COMPONENT_TYPE

import { 
  createComponent, removeComponent, moveComponent
} from '../actions/component'

import { toggleActiveComponent } from '../actions/app-state'

import {
  addPageBreak, removePageBreak
} from '../actions/page-break'

import {
  loadQuestionnaireIfNeeded
} from '../actions/questionnaire'

import { connect } from 'react-redux'

/**
 * Container component for Questionnaire
 */
class QuestionnaireContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.loadQuestionnaireIfNeeded(this.props.qrId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.qrId !== this.props.qrId)
      this.props.loadQuestionnaireIfNeeded(nextProps.qrId)
  }

  render() {
    const { loaded, qr } = this.props
    if (!loaded) return <span className="fa fa-spinner fa-pulse fa-2x"></span>
    return <Questionnaire qr={qr} {...this.props} />
  }
}

const mapStateToProps = state => {
  //TODO should not need app state to know the questionnaire
  const id = state.appState.questionnaire // questionnaire id

  const qrState = state.appState.questionnaireById[id]

  if (!qrState.loaded) {
    return {
      loaded: false,
      locale: state.locale,
      qrId: id,
      qr: null
    }
  }
  else {
    const { 
      componentById: cmpnts,
      appState: { 
        activecomponentById,
        giById: { [id]: { parent, before } }
      },
      pageBreakById
    } = state
    const { idToRank, flat } = flatten(state.componentById, id)
    return {
      loaded: true,
      qrId: id,
      locale: state.locale,
      idToRank,
      flat,
      //TODO enable positionning of generic input based on parent and before
      // Generic input has to behave like a question or a sequence (be in the
      // right place in the tree view, with some children if we create a 
      // subsequence at the middle of a sequence with children)
      qr: labelTreeFromFlat(
        cmpnts,
        activecomponentById,
        pageBreakById,
        id, qrState.filter,
        parent || id, // if gi.parent is not set, use the main sequence
        before // if empty, after the last child of the parent sequence
      ).childCmpnts   // treeLabelFromFlat returns a tree { id, active, 
                      // highlighted, childCmpnts }
    }
  }
}


QuestionnaireContainer.propTypes = {
  loaded: PropTypes.bool.isRequired,
  qrId: PropTypes.string.isRequired,
  qr: PropTypes.array,
  locale: PropTypes.object.isRequired
}


const mapDispatchToProps = {
  createComponent,
  removeComponent,
  moveComponent,
  addPageBreak,
  removePageBreak,
  toggleActiveComponent,
  loadQuestionnaireIfNeeded
}

//TODO implement genric input position

/**
 * Create a tree representation of the questionnaire from the state
 *
 * Each node or leaf holds all the properties needed to render the component
 * (label, depth...).
 * The generic input will be positionned amongst the questions and sequences.
 * The generic input position is based on the app state.
 *
 * @param  {array} cmpnts  child components
 * @param  {string} main   id of the sequence to process
 * @return {object}        tree view representation
 */
function labelTreeFromFlat(
    cmpnts, activeCmpnts, pageBreakById, main, filter, parent, before, depth=0) {
  const { type, label, name } = cmpnts[main]
  const hasPageBreak = pageBreakById.hasOwnProperty(main)
  const _filter = filter.toLowerCase()
  const tree = {
    id: main,
    type,
    label,
    name,
    depth,
    hasPageBreak,
    active: !!activeCmpnts[main],
    highlighted: !!(filter && label.toLowerCase().includes(_filter))
  }
  if (type === SEQUENCE) {
    const childCmpnts = cmpnts[main].childCmpnts
    const childCmpntsNodes = childCmpnts
      .map(id => 
        labelTreeFromFlat(cmpnts, activeCmpnts, pageBreakById, id, filter, parent, before, depth + 1)
      )
    if (parent === main) {
      //genric input stays in this sequence
      let giIndex = childCmpnts.indexOf(before)
      if (giIndex === -1) giIndex = childCmpnts.length
      childCmpntsNodes.splice(giIndex, 0, GENERIC_INPUT)
    }
    tree.childCmpnts = childCmpntsNodes
  }
  return tree

}

export default connect(mapStateToProps, mapDispatchToProps)
  (QuestionnaireContainer)
