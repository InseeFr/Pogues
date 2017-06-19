import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import locale from './dictionary';
import questionnaireById from './questionnaire-by-id';
import componentByQuestionnaire from './component-by-questionnaire';
import componentById from './component-by-id';
import appState from './app-state';
import conditionById from './condition-by-id';
import responseFormatById from './response-format-by-id';
import codeListById from './code-list-by-id';
import codeListByQuestionnaire from './code-list-by-questionnaire';
import codeById from './code-by-id';
import integrityChecker from 'utils/reducer/integrity-checker';
import combineCheckers from 'utils/reducer/combine-checkers';
import checkerQuestionnaireLength from 'utils/reducer/checker-questionnaire-length';

export default integrityChecker(
  combineReducers({
    locale,
    form,
    appState,
    componentById,
    componentByQuestionnaire,
    questionnaireById,
    codeListById,
    codeListByQuestionnaire,
    codeById,
    conditionById,
    responseFormatById,
  }),
  combineCheckers(checkerQuestionnaireLength)
);
