import { reduxForm } from 'redux-form';

import QuestionnaireNewEdit from '../components/questionnaire-new-edit';

import { QUESTIONNAIRE_NEW_FORM_NAME } from '../../../constants/pogues-constants';

// Form

export default reduxForm({
  form: QUESTIONNAIRE_NEW_FORM_NAME,
})(QuestionnaireNewEdit);
