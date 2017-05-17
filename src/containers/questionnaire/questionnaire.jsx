import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createComponent, removeComponent, moveComponent } from 'actions/component';
import { addPageBreak, removePageBreak } from 'actions/page-break';
import { loadQuestionnaireIfNeeded } from 'actions/questionnaire';
import Questionnaire from 'components/questionnaire/questionnaire';

// TODO implement genric input position and move to a utils file

import { flatten } from 'utils/data-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { SEQUENCE, GENERIC_INPUT } = COMPONENT_TYPE;

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
function labelTreeFromFlat(cmpnts, activeCmpnts, pageBreakById, main, filter, parent, before, depth = 0) {
  const { type, label, name } = cmpnts[main];
  const hasPageBreak = Object.prototype.hasOwnProperty.call(pageBreakById, 'main');
  const _filter = filter.toLowerCase();
  const tree = {
    id: main,
    type,
    label,
    name,
    depth,
    hasPageBreak,
    active: !!activeCmpnts[main],
    highlighted: !!(filter && label.toLowerCase().includes(_filter)),
  };
  if (type === SEQUENCE) {
    const childCmpnts = cmpnts[main].childCmpnts;
    const childCmpntsNodes = childCmpnts.map(id =>
      labelTreeFromFlat(cmpnts, activeCmpnts, pageBreakById, id, filter, parent, before, depth + 1)
    );
    // if (parent === main) {
    //   // generic input stays in this sequence
    //   let giIndex = childCmpnts.indexOf(before);
    //   if (giIndex === -1) giIndex = childCmpnts.length;
    //   childCmpntsNodes.splice(giIndex, 0, GENERIC_INPUT);
    // }
    tree.childCmpnts = childCmpntsNodes;
  }
  return tree;
}

const mapStateToProps = (state, { id }) => {
  const questionnaireState = state.appState.questionnaireById[id];
  const loaded = questionnaireState ? questionnaireState.loaded : false;

  const props = {
    locale: state.locale,
    id: id,
    loaded: loaded,
    questionnaire: state.questionnaireById[id],
    elements: [],
    idToRank: undefined,
    flat: [],
  };

  if (loaded) {
    const {
      componentById: cmpnts,
      appState: { activecomponentById, giById: { [id]: { parent, before } } },
      pageBreakById,
    } = state;

    const { idToRank, flat } = flatten(state.componentById, id);

    props.idToRank = idToRank;
    props.flat = flat;

    props.elements = labelTreeFromFlat(
      cmpnts,
      activecomponentById,
      pageBreakById,
      id,
      questionnaireState.filter,
      parent || id, // if gi.parent is not set, use the main sequence
      before // if empty, after the last child of the parent sequence
    ).childCmpnts; // treeLabelFromFlat returns a tree { id, active, highlighted, childCmpnts }
  }

  return props;
};

const mapDispatchToProps = {
  createComponent,
  removeComponent,
  moveComponent,
  addPageBreak,
  removePageBreak,
  loadQuestionnaireIfNeeded,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    questionnaire: PropTypes.object,
    elements: PropTypes.array,
    idToRank: PropTypes.object,
    flat: PropTypes.array,
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    createComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    moveComponent: PropTypes.func.isRequired,
    addPageBreak: PropTypes.func.isRequired,
    removePageBreak: PropTypes.func.isRequired,
  };

  static defaultProps = {
    questionnaire: {},
    elements: [],
    idToRank: undefined,
    flat: [],
  };

  componentWillMount() {
    this.props.loadQuestionnaireIfNeeded(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.props.loadQuestionnaireIfNeeded(nextProps.id);
  }

  render() {
    if (!this.props.loaded) return <span className="fa fa-spinner fa-pulse fa-2x" />;
    return (
      <Questionnaire
        locale={this.props.locale}
        questionnaire={this.props.questionnaire}
        elements={this.props.elements}
        flat={this.props.flat}
        idToRank={this.props.idToRank}
        createComponent={this.props.createComponent}
        removeComponent={this.props.removeComponent}
        moveComponent={this.props.moveComponent}
        addPageBreak={this.props.addPageBreak}
        removePageBreak={this.props.removePageBreak}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
