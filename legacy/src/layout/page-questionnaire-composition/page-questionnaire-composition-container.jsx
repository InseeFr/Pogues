import { connect } from 'react-redux';

import PageQuestionnaireComposition from './page-questionnaire-composition';

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

const PageQuestionnaireCompositionContainer = connect(mapStateToProps)(
  PageQuestionnaireComposition,
);

export default PageQuestionnaireCompositionContainer;
