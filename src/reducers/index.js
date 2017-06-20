import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import appState from './app-state';
import questionnaireById from './questionnaire-by-id';
import componentById from './component-by-id';
import conditionById from './condition-by-id';
import questionnaireList from './questionnaire-list';
import locale from './dictionary';
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
    form,
  }),
  combineCheckers()
);
