import { reduxForm } from 'redux-form';

import { STATISTICAL_CONTEXT_FORM_NAME } from '../../../constants/pogues-constants';
import { StatisticalContextCriteria } from '../../../widgets/statistical-context-criteria';

function CriteriaContainer() {
  return (
    <div>
      <StatisticalContextCriteria horizontal />
    </div>
  );
}

export default reduxForm({
  form: STATISTICAL_CONTEXT_FORM_NAME,
})(CriteriaContainer);
