import { reduxForm } from 'redux-form';

import { QUESTIONNAIRE_NEW_FORM_NAME } from '../../constants/pogues-constants';
import QuestionnaireNewEdit from './questionnaire-new-edit';

// Form

export default reduxForm({
  form: QUESTIONNAIRE_NEW_FORM_NAME,
})(QuestionnaireNewEdit);
