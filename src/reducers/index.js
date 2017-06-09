import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import appState from './app-state/app-state';
import locale from './dictionary';
import questionnaireById from './questionnaire-by-id';
import componentByQuestionnaire from './component-by-questionnaire';
import componentById from './component-by-id';
import conditionById from './condition-by-id';
import responseFormatById from './response-format-by-id';
import codeListById from './code-list-by-id';
import codeById from './code-by-id';
import integrityChecker from 'utils/reducer/integrity-checker';
import combineCheckers from 'utils/reducer/combine-checkers';

export default integrityChecker(
  combineReducers({
    locale,
    form,
    appState,
    componentById,
    componentByQuestionnaire,
    questionnaireById,
    codeListById,
    codeById,
    conditionById,
    responseFormatById,
  }),
  combineCheckers()
);
