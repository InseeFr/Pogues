import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import locale from 'reducers/dictionary';
import appState from 'reducers/app-state/app-state';
import questionnaireById from 'reducers/questionnaire-by-id';
import componentByQuestionnaire from 'reducers/component-by-questionnaire';
import conditionByQuestionnaire from 'reducers/condition-by-questionnaire';
import codeListByQuestionnaire from 'reducers/code-list-by-questionnaire';
import calculatedVariableByQuestionnaire from 'reducers/calculated-variable-by-questionnaire';

import integrityChecker from 'utils/reducer/integrity-checker';
import checkers from 'utils/reducer/checkers';

export default integrityChecker(
  combineReducers({
    form,
    locale,
    appState,
    questionnaireById,
    componentByQuestionnaire,
    conditionByQuestionnaire,
    codeListByQuestionnaire,
    calculatedVariableByQuestionnaire,
  }),
  checkers
);
