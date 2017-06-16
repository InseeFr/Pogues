import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GenericInput from 'components/generic-input/generic-input';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { saveActiveQuestionnaire } from 'actions/app-state';
import {
  getNewSequencePlaceholder,
  getNewSubsequencePlaceholder,
  getNewQuestionPlaceholder,
} from 'utils/model/generic-input-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  components: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponent,
});

const mapDispatchToProps = {
  saveActiveQuestionnaire,
};

function GenericInputContainer({ questionnaire, components, selectedComponentId, saveActiveQuestionnaire }) {
  const placeholders = {};
  const selectedComponent = components[selectedComponentId];

  placeholders[SEQUENCE] = getNewSequencePlaceholder(components, questionnaire.id, selectedComponent);
  placeholders[SUBSEQUENCE] = getNewSubsequencePlaceholder(components, selectedComponent);
  placeholders[QUESTION] = getNewQuestionPlaceholder(components, selectedComponent);

  return <GenericInput placeholders={placeholders} saveActiveQuestionnaire={saveActiveQuestionnaire} />;
}

GenericInputContainer.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  selectedComponentId: PropTypes.string.isRequired,
  saveActiveQuestionnaire: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GenericInputContainer);
