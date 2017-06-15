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

const mapStateToProps = (state, { questionnaireId }) => {
  const componentListByQuestionnaire = state.appState.componentListByQuestionnaire;
  return {
    questionnaireId: questionnaireId,
    activeComponent: state.appState.activeComponent,
    components: Object.prototype.hasOwnProperty.call(componentListByQuestionnaire, questionnaireId)
      ? componentListByQuestionnaire[questionnaireId]
      : {},
  };
};

function GenericInputContainer({ questionnaireId, activeComponent, components }) {
  const placeholders = {};
  const activeComponentObj = activeComponent !== '' ? components[activeComponent] : undefined;

  placeholders[SEQUENCE] = getNewSequencePlaceholder(components, questionnaireId, activeComponentObj);
  placeholders[SUBSEQUENCE] = getNewSubsequencePlaceholder(components, activeComponentObj);
  placeholders[QUESTION] = getNewQuestionPlaceholder(components, activeComponentObj);

  return <GenericInput questionnaireId={questionnaireId} placeholders={placeholders} />;
}

GenericInputContainer.propTypes = {
  questionnaireId: PropTypes.string.isRequired,
  activeComponent: PropTypes.string,
  components: PropTypes.object,
};

GenericInputContainer.defaultProps = {
  activeComponent: '',
  components: {},
};

export default connect(mapStateToProps)(GenericInputContainer);
