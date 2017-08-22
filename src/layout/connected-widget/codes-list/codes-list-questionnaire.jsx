import React from 'react';
import CodesListQuestionnaire from '../components/codes-list/codes-list-questionnaire';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function mapStateToProps(state) {
  return {
    activeCodeListsById: state.appState.activeCodeListsById,
  };
}

function CodesListQuestionnaireContainer({ activeCodeListsById }) {
  return <CodesListQuestionnaire codeLists={activeCodeListsById} />;
}

CodesListQuestionnaireContainer.propTypes = {
  activeCodeListsById: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CodesListQuestionnaireContainer);
