import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    rootReducer,
    undefined,
    compose(
	    applyMiddleware(
	      thunkMiddleware,
	      loggerMiddleware
	     ),
	    window.devToolsExtension ? window.devToolsExtension() : f => f)
    )
}

