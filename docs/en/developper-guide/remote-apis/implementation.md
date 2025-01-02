# Implementation

Network requests are triggered by React components which need remote resources. These components use some `loadSomethingIfNeeded` like function in their `useEffect()` hooks. For instance, the `PageQuestionnaire` component calls `loadCampaignsIfNeeded` when it is [mounted](https://github.com/InseeFr/Pogues/blob/main/src/layout/page-questionnaire/components/page-questionnaire.jsx). This section explains how this process works.

## Network requests

The network requests are written in the [src/api/remote-api.js](https://github.com/InseeFr/Pogues/blob/master/src/api/remote-api.js) file. They rely on the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). A polyfill is provided for browsers which do not support it, via the [babel-polyfill](https://github.com/InseeFr/Pogues/blob/d28a7f67894479807f6b3d1c45b1b24883a556c4/src/js/main.js#L11).

Example:

```javascript
/**
 * Retrieve questionnaire
 * path like '/pogues/questionnaire:id'
 */
export const getQuestionnaire = id =>
  fetch(urlGetQuestionnaire + '/' + id, {
    headers: {
      Accept: 'application/JSON',
    },
  }).then(res => res.JSON());
```

This module exports some functions which return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). It the remote call succeeds, the Promise will resolve to:

- the expected raw data (`res.JSON()`) for `GET` operations;
- the raw response if no data needs to be extracted from the response;
- value of a header field if relevant.

This file mixes calls for all of the three services:

- [visualization](./visualization.md) (`stromaePostQuestionnaire`);
- [persistence](./persistence.md) (`getQuestionnaire`, `putQuestionnaire`, `getQuestionnaireList`...);
- [repository](./repository.md) (`getCodeListSpecs`, `getCodeList`).

## Action creators

To trigger remote calls, we use action creators in combination with [Redux Thunk middleware](https://github.com/gaearon/redux-thunk). We follow the pattern for [asyncrhonous actions](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators) from the Redux documentation.

With Redux Thunk, action creators can return a function instead of a plain JavaScript object. Hence, we can write asynchronous actions with a function which:

- synchronously dispatches a plain JavaScript object action to indicate that the request has been registered; action type follows the `LOAD_SOMETHING` naming convention;
- sends the request (with functions from the aforementioned [src/api/remote-api.js](https://github.com/InseeFr/Pogues/blob/master/src/api/remote-api.js) file, like `getQuestionnaire`);
- asynchronously dispatches a `LOAD_SOMETHING_SUCCESS` action if the Promise returned by the fetch call succeeds (`then` handler), or a `LOAD_SOMETHING_FAILURE` if it fails (`catch` handler);
- returns the Promise for possible further processing.

Example from [src/js/actions/questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/actions/questionnaire.js) (in the initial code we use arrow functions instead of the regular `function` definitions shown here):

```javascript
import { getQuestionnaire } from '(...)/remote-api';

export function loadQuestionnaire(id) {
  //Thanks to Redux Thunk, we can return a function from our action creator.
  //This function will be passed two arguments by the Redux Thunk middleware:
  //a `dispatch` function to dispatch to the store, and a `getState` function
  //(not used here) to read the current application state.
  return function (dispatch, getState) {
    dispatch({
      type: LOAD_QUESTIONNAIRE,
      payload: id,
    });
    return getQuestionnaire(id)
      .then(qr => {
        dispatch(loadQuestionnaireSuccess(id, questionnaireToState(qr)));
      })
      .catch(err => {
        dispatch(loadQuestionnaireFailure(id, err.toString()));
      });
  };
}

export function loadQuestionnaireSuccess(id, update) {
  return {
    type: LOAD_QUESTIONNAIRE_SUCCESS,
    payload: { id, update },
  };
}

export function loadQuestionnaireFailure(id, err) {
  return {
    type: LOAD_QUESTIONNAIRE_FAILURE,
    payload: { id, err },
  };
}
```

Note: we should probably avoid usage of `catch` here (see [#146](https://github.com/InseeFr/Pogues/issues/146))

TODO screenshot devtools

## Do not ask twice for the same resource

We also use Redux Thunk to define some action creators that will take care of not loading a resource again if it is available locally from the application state:

```javascript
export function loadQuestionnaireIfNeeded(id) {
  return function (dispatch, getState) {
    const state = getState();
    const qr = state.questionnaireById[id];
    if (!qr) return dispatch(loadQuestionnaire(id));
  };
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
