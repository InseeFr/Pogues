import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GenericInput from 'components/generic-input/generic-input';
import { getNewQuestionPlaceholder } from 'utils/model/generic-input-utils';

const mapStateToProps = (state, { questionnaireId }) => {
  const componentListByQuestionnaire = state.appState.componentListByQuestionnaire;
  return {
    questionnaire: state.questionnaireById[questionnaireId],
    components: Object.prototype.hasOwnProperty.call(componentListByQuestionnaire, questionnaireId)
      ? componentListByQuestionnaire[questionnaireId]
      : {},
  };
};

function GenericInputContainer({ questionnaire, components }) {
  const newQuestionPlaceholder = getNewQuestionPlaceholder(components, questionnaire.id);

  return <GenericInput questionnaireId={questionnaire.id} />;
}

GenericInputContainer.propTypes = {
  questionnaire: PropTypes.object,
  components: PropTypes.object,
};

GenericInputContainer.defaultProps = {
  questionnaire: {},
  components: {},
};

export default connect(mapStateToProps)(GenericInputContainer);
