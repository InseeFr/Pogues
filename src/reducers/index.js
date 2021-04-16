import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as oidc } from '@axa-fr/react-oidc-redux';

import locale from 'reducers/dictionary';
import appState from 'reducers/app-state/app-state';
import questionnaireById from 'reducers/questionnaire-by-id';
import componentByQuestionnaire from 'reducers/component-by-questionnaire';
import codeListByQuestionnaire from 'reducers/code-list-by-questionnaire';
import calculatedVariableByQuestionnaire from 'reducers/calculated-variable-by-questionnaire';
import externalVariableByQuestionnaire from 'reducers/external-variable-by-questionnaire';
import collectedVariableByQuestionnaire from 'reducers/collected-variable-by-questionnaire';
import searchResultById from 'reducers/search-result-by-id';
import metadataByType from 'reducers/metadata-by-type';
import errors from 'reducers/errors/errors';

import integrityChecker from 'utils/integrity/integrity-checker';
import checkers from 'utils/integrity/checkers';

export default integrityChecker(
  combineReducers({
    authType: (s = '') => s,
    oidc,
    form,
    locale,
    appState,
    questionnaireById,
    componentByQuestionnaire,
    codeListByQuestionnaire,
    calculatedVariableByQuestionnaire,
    externalVariableByQuestionnaire,
    collectedVariableByQuestionnaire,
    searchResultById,
    metadataByType,
    errors,
  }),
  checkers,
);
