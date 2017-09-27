import React from 'react';
import { reduxForm } from 'redux-form';

import StatisticalContextContainer from 'layout/connected-widget/statistical-context';

const FORM_NAME = 'filters';

function Filters() {
  return <StatisticalContextContainer formName={FORM_NAME} />;
}

export default reduxForm({
  form: FORM_NAME,
})(Filters);
