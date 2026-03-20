import { connect } from 'react-redux';

import PageQuestionnaireMerge from './page-questionnaire-merge';

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  id,
  questionnaire: state.questionnaireById[id],
});

const PageQuestionnaireMergeContainer = connect(mapStateToProps)(
  PageQuestionnaireMerge,
);

export default PageQuestionnaireMergeContainer;
