import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GenericInput from 'components/generic-input/generic-input';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
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

function GenericInputContainer({ questionnaire, components, selectedComponentId }) {
  const placeholders = {};
  const selectedComponent = components[selectedComponentId];

  placeholders[SEQUENCE] = getNewSequencePlaceholder(components, questionnaire.id, selectedComponent);
  placeholders[SUBSEQUENCE] = getNewSubsequencePlaceholder(components, selectedComponent);
  placeholders[QUESTION] = getNewQuestionPlaceholder(components, selectedComponent);

  return <GenericInput questionnaire={questionnaire} placeholders={placeholders} />;
}

GenericInputContainer.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  selectedComponentId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GenericInputContainer);
