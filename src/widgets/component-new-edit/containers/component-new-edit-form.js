import { reduxForm } from 'redux-form';

import ComponentNewEdit from '../components/component-new-edit';

import { DEFAULT_FORM_NAME } from 'constants/pogues-constants';

// Form

export default reduxForm({
  form: DEFAULT_FORM_NAME,
})(ComponentNewEdit);
