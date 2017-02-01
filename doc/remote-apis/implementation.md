# Implementation

## Network requests

The network requests are written in the [src/js/utils/remote-api.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/remote-api.js) file. They rely on the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). A polyfill is provided for browsers which do not support it, via the [babel-polyfill](https://github.com/InseeFr/Pogues/blob/d28a7f67894479807f6b3d1c45b1b24883a556c4/src/js/main.js#L11).

Example:
```javascript
/**
 * Retrieve questionnaire
 * path like '/pogues/questionnaire:id'
 */
export const getQuestionnaire = id =>
  fetch(urlGetQuestionnaire + '/' + id, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => res.json())
```

This module exports some functions which return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). It the remote call succeeds, the Promise will resolve to:
- the expected raw data (`res.json()`) for `GET` operations;
- the raw response if no data needs to be extracted from the response;
- value of a header field if relevant.

This file mix calls for all of the three services:
- persistence (`getQuestionnaire`, `putQuestionnaire`, `getQuestionnaireList`...);
- visualization (`stromaePostQuestionnaire`);
- repository (`getCodeListSpecs`,  `getCodeList`).

## Action creators

To trigger remote calls, we use action creators in combination with [Redux Thunk middleware](https://github.com/gaearon/redux-thunk). We follow the pattern for [asyncrhonous actions](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators) from the Redux documentation.

With Redux Thunk, action creators can return a function instead of a plain javascript object. Hence, we can write asynchronous action creators with a function which:
- synchronously dispatches a plain javascript object action to indicate that the request has been registered; action type follows the `LOAD_SOMETHING` naming convention;
- sends the request (with functions from the `remote-api.js` mentioned above, like `getQuestionnaire`);
- asynchronously dispatches a `LOAD_SOMETHING_SUCCESS` action if the Promise returned by the fetch call succeeds (`then` handler), or a `LOAD_SOMETHING_FAILURE` if it fails (`catch` handler);
- returns the Promise for possible further processing.

Example:
```javascript
import { getQuestionnaire } from '(...)/remote-api'

export const loadQuestionnaire = id =>
  dispatch => {
    dispatch({
      type: LOAD_QUESTIONNAIRE,
      payload: id
    })
    return getQuestionnaire(id)
      .then(qr => {
        dispatch(loadQuestionnaireSuccess(id, questionnaireToState(qr)))
      })
      .catch(err => {
        dispatch(loadQuestionnaireFailure(id, err.toString()))
      })
  }

export const loadQuestionnaireSuccess = (id, update) => (
  {
    type: LOAD_QUESTIONNAIRE_SUCCESS,
    payload: { id, update }
  })

export const loadQuestionnaireFailure = (id, err) => (
  {
    type: LOAD_QUESTIONNAIRE_FAILURE,
    payload: { id, err }
  })  
```

Note: we should probably avoid usage of `catch` here (see [#146](https://github.com/InseeFr/Pogues/issues/146))

TODO screenshot devtools


## Do not ask twice for the same resource

We also use Redux Thunk to define some action creators that will take care of not loading a resource again if it is available locally from the application state:

```javascript
export const loadQuestionnaireIfNeeded = id =>
  (dispatch, getState) => {
    const state = getState()
    const qr = state.questionnaireById[id]
    if (!qr) dispatch(loadQuestionnaire(id))
  }
```

These `loadSomethingIfNeeded` action creators can be called from React `componentWillMount` and `componentWillReceiveProps` life cycle methods.

Example from the [src/js/components/questionnaire-container.js](https://github.com/InseeFr/Pogues/blob/master/src/js/components/questionnaire-container.js) file:

```javascript
class QuestionnaireContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.loadQuestionnaireIfNeeded(this.props.qrId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.qrId !== this.props.qrId)
      this.props.loadQuestionnaireIfNeeded(nextProps.qrId)
  }
  ...
}
```