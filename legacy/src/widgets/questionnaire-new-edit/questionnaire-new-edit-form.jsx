import { QUESTIONNAIRE_NEW_FORM_NAME } from '../../constants/pogues-constants';
import { reduxFormNamed } from '../../utils/redux-form-named';
import QuestionnaireNewEdit from './questionnaire-new-edit';

export default reduxFormNamed({
  form: QUESTIONNAIRE_NEW_FORM_NAME,
})(QuestionnaireNewEdit);
