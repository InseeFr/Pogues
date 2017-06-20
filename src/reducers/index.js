import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import appState from 'reducers/app-state/app-state';
import locale from 'reducers/dictionary';
import questionnaireById from 'reducers/questionnaire-by-id';
import componentByQuestionnaire from 'reducers/component-by-questionnaire';
import componentById from 'reducers/component-by-id';
import conditionById from 'reducers/condition-by-id';
import responseFormatById from 'reducers/response-format-by-id';
import codeListById from 'reducers/code-list-by-id';
import codeById from 'reducers/code-by-id';
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
    codeById,
    conditionById,
    responseFormatById,
  }),
  combineCheckers(checkerQuestionnaireLength)
);
