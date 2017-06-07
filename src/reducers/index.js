import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import appState from './app-state';
import questionnaireById from './questionnaire-by-id';
import componentById from './component-by-id';
import conditionById from './condition-by-id';
import responseFormatById from './response-format-by-id';
import questionnaireList from './questionnaire-list';
import locale from './dictionary';
import codeListById from './code-list-by-id';
import codeListByQuestionnaire from './code-list-by-questionnaire';
import codeById from './code-by-id';
import integrityChecker from 'utils/reducer/integrity-checker';
import combineCheckers from 'utils/reducer/combine-checkers';

export default integrityChecker(
  combineReducers({
    locale,
    appState,
    questionnaireList,
    questionnaireById,
    componentById,
    conditionById,
    responseFormatById,
    codeListById,
    codeListByQuestionnaire,
    codeById,
    form,
  }),
  combineCheckers()
);
