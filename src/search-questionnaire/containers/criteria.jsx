import React from 'react';
import { reduxForm } from 'redux-form';

import { StatisticalContextCriteria } from 'widgets/statistical-context-criteria';
import { STATISTICAL_CONTEXT_FORM_NAME } from 'constants/pogues-constants';

import { CodesLists } from 'widgets/codes-lists';

function CriteriaContainer() {
  return (
    <div>
      <CodesLists formName={STATISTICAL_CONTEXT_FORM_NAME} />
      <StatisticalContextCriteria horizontal />
    </div>
  );
}

export default reduxForm({
  form: STATISTICAL_CONTEXT_FORM_NAME,
})(CriteriaContainer);
