import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
// import { reducer as oidc } from '@axa-fr/react-oidc-redux';

import locale from './dictionary';
import appState from './app-state/app-state';
import questionnaireById from './questionnaire-by-id';
import questionnaireListById from './questionnaire-list-by-id';
import componentByQuestionnaire from './component-by-questionnaire';
import codeListByQuestionnaire from './code-list-by-questionnaire';
import calculatedVariableByQuestionnaire from './calculated-variable-by-questionnaire';
import externalVariableByQuestionnaire from './external-variable-by-questionnaire';
import collectedVariableByQuestionnaire from './collected-variable-by-questionnaire';
import searchResultById from './search-result-by-id';
import metadataByType from './metadata-by-type';
import errors from './errors/errors';
import general from './general';

import integrityChecker from '../utils/integrity/integrity-checker';
import checkers from '../utils/integrity/checkers';

export default integrityChecker(
  combineReducers({
    authType: (s = '') => s,
    isSearchDisable: (s = '') => s,
    /* oidc, */
    form,
    locale,
    appState,
    questionnaireById,
    questionnaireListById,
    componentByQuestionnaire,
    codeListByQuestionnaire,
    calculatedVariableByQuestionnaire,
    externalVariableByQuestionnaire,
    collectedVariableByQuestionnaire,
    searchResultById,
    metadataByType,
    errors,
    general,
  }),
  checkers,
);
