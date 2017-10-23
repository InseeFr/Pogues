import React from 'react';
import { reduxForm } from 'redux-form';

import { StatisticalContextCriteria } from 'widgets/statistical-context-criteria';
import { STATISTICAL_CONTEXT_FORM_NAME } from 'constants/pogues-constants';

function CriteriaContainer() {
  return <StatisticalContextCriteria horizontal />;
}

export default reduxForm({
  form: STATISTICAL_CONTEXT_FORM_NAME,
})(CriteriaContainer);
