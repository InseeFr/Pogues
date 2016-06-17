import { combineReducers } from 'redux'
import appState from './app-state'
import questionnaireById from './questionnaires-by-id'
import componentById from './components-by-id'
import goToById from './goTos-by-id'
import declarationById from './declarations-by-id'
import controlById from './controls-by-id'
import codeListById from './code-list-by-id'
import responseById from './response-by-id'
import codeById from './code-by-id'
import config from './config'
import integrityChecker from './integrity-checker'
import checker from './checkers'

import locale from './dictionary'
import questionnaireList from './questionnaire-list'
import { REMOTE_EVENT } from '../constants/pogues-constants'
const { PENDING, LOADED, FAILED } = REMOTE_EVENT

//TODO think again
// A lot of boilerplate in the ui with a `locale` reducer, it might be better to
// pass locale through the context (but risky if we want to change the language
// during the session ?)
// 
export default integrityChecker(combineReducers({
  locale,
  config,
  appState,
  questionnaireList,
  questionnaireById,
  componentById,
  codeListById,
  goToById,
  declarationById,
  controlById,
  responseById,
  codeById
}), checker)
