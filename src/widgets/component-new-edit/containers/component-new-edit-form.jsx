import { reduxForm } from 'redux-form';

import ComponentNewEditContainer from './component-new-edit-container';

import { DEFAULT_FORM_NAME } from '../../../constants/pogues-constants';

// Form

export default reduxForm({
  form: DEFAULT_FORM_NAME,
})(ComponentNewEditContainer);
