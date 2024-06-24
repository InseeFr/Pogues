import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import appState from './app-state/app-state';
import calculatedVariableByQuestionnaire from './calculated-variable-by-questionnaire';
import codeListByQuestionnaire from './code-list-by-questionnaire';
import collectedVariableByQuestionnaire from './collected-variable-by-questionnaire';
import componentByQuestionnaire from './component-by-questionnaire';
import locale from './dictionary';
import errors from './errors/errors';
import externalVariableByQuestionnaire from './external-variable-by-questionnaire';
import general from './general';
import metadataByType from './metadata-by-type';
import questionnaireById from './questionnaire-by-id';
import questionnaireListById from './questionnaire-list-by-id';
import searchResultById from './search-result-by-id';

import checkers from '../utils/integrity/checkers';
import integrityChecker from '../utils/integrity/integrity-checker';

export default integrityChecker(
  combineReducers({
    authType: (s = '') => s,
    isSearchDisable: (s = '') => s,
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
