import { combineReducers } from 'redux'
import appState from './app-state'
import questionnaireById from './questionnaires-by-id'
import componentById from './components-by-id'
import goToById from './goTos-by-id'
import declarationById from './declarations-by-id'
import controlById from './controls-by-id'
import codeListById from './code-list-by-id'
import codeListByQuestionnaire from './code-list-by-questionnaire'
import responseFormatById from './response-format-by-id'
import codeById from './code-by-id'
import conditionById from './condition-by-id'
import pageBreakById from './page-break-by-id'
import config from './config'
import integrityChecker from './integrity-checker'
import combineCheckers from './checkers'
import goTosChecker from '../utils/goTosChecker'
import questionnaireLengthChecker from '../utils/questionnaireLengthChecker'
import locale from './dictionary'
import questionnaireList from './questionnaire-list'

//TODO think again
// A lot of boilerplate in the ui with a `locale` reducer, it might be better to
// pass locale through the context (but risky if we want to change the language
// during the session ?)

export default integrityChecker(combineReducers({
  locale,
  config,
  appState,
  questionnaireList,
  questionnaireById,
  componentById,
  codeListByQuestionnaire,
  codeListById,
  goToById,
  declarationById,
  controlById,
  responseFormatById,
  codeById,
  conditionById,
  pageBreakById
}), combineCheckers(questionnaireLengthChecker, goTosChecker))
