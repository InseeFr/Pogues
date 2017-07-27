import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import locale from 'reducers/dictionary';
import appState from 'reducers/app-state/app-state';
import questionnaireById from 'reducers/questionnaire-by-id';
import componentByQuestionnaire from 'reducers/component-by-questionnaire';
import declarationByQuestionnaire from 'reducers/declaration-by-questionnaire';
import conditionByQuestionnaire from 'reducers/condition-by-questionnaire';
import codeListByQuestionnaire from 'reducers/code-list-by-questionnaire';
import codeByQuestionnaire from 'reducers/code-by-questionnaire';

import integrityChecker from 'utils/reducer/integrity-checker';
import combineCheckers from 'utils/reducer/combine-checkers';
import checkerQuestionnaireLength from 'utils/reducer/checker-questionnaire-length';

export default integrityChecker(
  combineReducers({
    form,
    locale,
    appState,
    questionnaireById,
    componentByQuestionnaire,
    declarationByQuestionnaire,
    conditionByQuestionnaire,
    codeListByQuestionnaire,
    codeByQuestionnaire,
  }),
  combineCheckers(checkerQuestionnaireLength)
);
