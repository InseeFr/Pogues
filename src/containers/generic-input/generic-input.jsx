import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GenericInput from 'components/generic-input/generic-input';
import { getNewQuestionPlaceholder } from 'utils/model/generic-input-utils';

const mapStateToProps = (state, { questionnaireId }) => {
  const componentListByQuestionnaire = state.appState.componentListByQuestionnaire;
  return {
    locale: state.locale,
    questionnaire: state.questionnaireById[questionnaireId],
    components: Object.prototype.hasOwnProperty.call(componentListByQuestionnaire, questionnaireId)
      ? componentListByQuestionnaire[questionnaireId]
      : {},
  };
};

function GenericInputContainer({ locale, questionnaire, components }) {
  const newQuestionPlaceholder = getNewQuestionPlaceholder(components, questionnaire.id);

  return <GenericInput locale={locale} questionnaireId={questionnaire.id} />;
}

GenericInputContainer.propTypes = {
  locale: PropTypes.object.isRequired,
  questionnaire: PropTypes.object,
  components: PropTypes.object,
};

GenericInputContainer.defaultProps = {
  questionnaire: {},
  components: {},
};

export default connect(mapStateToProps)(GenericInputContainer);
