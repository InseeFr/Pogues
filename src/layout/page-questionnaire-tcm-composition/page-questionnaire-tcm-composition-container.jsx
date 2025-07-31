import { connect } from 'react-redux';

import PageQuestionnaireTcmComposition from './page-questionnaire-tcm-composition';

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  questionnaire: state.questionnaireById[id],
});

const PageQuestionnaireTcmCompositionContainer = connect(mapStateToProps)(
  PageQuestionnaireTcmComposition,
);

export default PageQuestionnaireTcmCompositionContainer;
