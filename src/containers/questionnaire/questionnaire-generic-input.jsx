import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionnaireGenericInput from 'components/questionnaire/questionnaire-generic-input';
import { getNewQuestionPlaceholder } from 'utils/model/generic-input-utils';

const mapStateToProps = (state, { id }) => {
  const componentListByQuestionnaire = state.appState.componentListByQuestionnaire;
  return {
    locale: state.locale,
    questionnaire: state.questionnaireById[id],
    components: Object.prototype.hasOwnProperty.call(componentListByQuestionnaire, id)
      ? componentListByQuestionnaire[id]
      : {},
  };
};

function QuestionnaireGenericInputContainer({ locale, questionnaire, components }) {
  const newQuestionPlaceholder = getNewQuestionPlaceholder(components, questionnaire.id);
  // const newQuestionPlaceholder = 'dummy';

  return <QuestionnaireGenericInput locale={locale} newQuestionPlaceholder={newQuestionPlaceholder} />;
}

QuestionnaireGenericInputContainer.propTypes = {
  locale: PropTypes.object.isRequired,
  questionnaire: PropTypes.object,
  components: PropTypes.object,
};

QuestionnaireGenericInputContainer.defaultProps = {
  questionnaire: {},
  components: {},
};

export default connect(mapStateToProps)(QuestionnaireGenericInputContainer);
