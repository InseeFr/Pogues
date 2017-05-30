import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import appState from './_app-state';
import questionnaireById from './_questionnaire-by-id';
import componentById from './_component-by-id';
import conditionById from './_condition-by-id';
import questionnaireList from './_questionnaire-list';
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
