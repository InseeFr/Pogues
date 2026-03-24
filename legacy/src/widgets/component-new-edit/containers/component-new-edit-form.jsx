import { reduxForm } from 'redux-form';

import { DEFAULT_FORM_NAME } from '../../../constants/pogues-constants';
import ComponentNewEditContainer from './component-new-edit-container';

// Form

export default reduxForm({
  form: DEFAULT_FORM_NAME,
})(ComponentNewEditContainer);
