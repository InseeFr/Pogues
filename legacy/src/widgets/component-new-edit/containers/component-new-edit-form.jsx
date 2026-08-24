import { DEFAULT_FORM_NAME } from '../../../constants/pogues-constants';
import { reduxFormNamed } from '../../../utils/redux-form-named';
import ComponentNewEditContainer from './component-new-edit-container';

export default reduxFormNamed({
  form: DEFAULT_FORM_NAME,
})(ComponentNewEditContainer);
