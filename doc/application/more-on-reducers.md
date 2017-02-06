# More on reducers and actions

## Handling actions

At first, reducers in Pogues were written with `switch` statements:

```javascript
function myReducer(state, action) {
  switch (action.type) {
    case SOMETHING:
      return {...}
    case ANOTHER:
      return {...}
    default:
      return state
  }
}
```

As the code grew, we found that this implementation was not always easy to read (some cases need a bit of logic) and we favored the representation of the different cases with an object of functions. Each key represents an action type, each value, a handler which needs to be called to process an action of this given type. This handler:
- takes the state (for instance the codes for the `codes-by-id` reducer) as its first argument;
- takes the action's payload as its second argument;
- returns the new state.

From the [code-by-id](https://github.com/InseeFr/Pogues/blob/master/src/js/reducers/code-by-id.js) reducer:

```javascript
//a dictionary with all the action types which need to be proccessed by this
//reducer, with the corresponding `handler`
const actionsHndlrs = {
  CREATE_CODE: createCode,
  REMOVE_CODE: removeCode,
  EDIT_CODE: editCode,
  ...
}

//generic utility function to replace `switch` statements
export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

//a handler for the `CREATE_CODE` action
function createCode(codes, { id, label, value }) {
  return {
    ...codes,
    [id]: {
      id, label, value
    }
  }
}

...
```

The generic utility function could benefit to be shared by all the reducers (instead of being defined inline in each reducer).

## Reducers are collections

Most reducers handle a piece of state which consist in a collection of entities. For instance, the `codes-by-id` reducer is a collection (a `JavaScript` object literal) where each key represents a code id, and each value, information about the code corresponding to this id.

The different patterns described below are quite general. Adding some utility functions to reduce boilerplate could be an interesting option.

Add a new entry:
```javascript
function createCode(codes, { id, label, value }) {
  return {
    ...codes,
    [id]: {
      id, label, value
    }
  }
}
```

Remove an existing entry:
```javascript
function removeCode(codes, { id }) {
  //usage of the spread operator is very convenient to build to objects to take
  //apart the entry with the given id and all the remaining entries
  const { [id]: toRemove, ...toKeep } = codes
  return toKeep
}
```

Update an existing code:
```javascript
function editCode(codes, { id, update }) {
  return {
    //start with a fresh copy of the state
    ...codes,
    //override the entry for the given id
    [id]: {
      //start with a fresh copy of this entry
      ...codes[id],
      //apply the update (all the keys present in the payload will override the
      //corresponding existing keys)
      ...update
    }
  }
}
```

## Loading a questionnaire

When the user selects a questionnaire from the questionnaire list, there are many elementary steps to process, from switching the view and sending the request, to updating the UI. Here is a global picture:

1. The application shows the `QuestionnairePicker` component.
2. The user selects a questionnaire in the questionnaire list.
3. The `switchQuestionnaire` action [creator](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/components/questionnaire-list.js#L34)  is called.
4. The `SWITCH_TO_QUESTIONNAIRE` [action](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/app-state.js#L7) is dispatched. It contains the questionnaire id in its payload.
5. The [switchToQuestionnaire](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/reducers/app-state/index.js#L111) handler from the `appState` reducer updates the `view` entry and set it to `QUESTIONNAIRE`.
6. The application re-renders.
7. When rendering the main `PoguesApp` component, the `view` entry is checked, and the `QuestionnaireContainer` component is [rendered](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/components/pogues-app.js#L27-L30), in place of the previous `QuestionnairePicker` component.
8. In its `componentWillMount` method, the [loadQuestionnaireIfNeeded](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L94) function is [called](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/components/pogues-app.js#L27-L30). It takes the questionnaire id as an argument.
9. Assuming the questionnaire has not been already loaded, the `loadQuestionnaire` action creator is [called](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L98).
10. The component renders a spinner to indicate that the questionnaire is loading.
11. The `LOAD_QUESTIONNAIRE` action will be [dispatched](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L103), with the questionnaire id in its payload.
12. The [getQuestionnaire](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/utils/remote-api.js#L118) function is called. The browser tries to fetch the given resource and returns a Promise.
. The fetch call succeeds and the Promise resolves to a `json` representation of the questionnaire.
13. The `then` [handler](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L101) in the action creators file is executed.
14. It calls the [toSate](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/utils/model-to-state-questionnaire.js#L17) function and dispatches the `LOAD_QUESTIONNAIRE_SUCCESS` action with the result of this function in its payload.
15. The `LOAD_QUESTIONNAIRE_SUCCESS` is processed by many reducers to update the application state: to add an entry in the `questionnaires-by-id` reducer, to add multiple entries in the `components-by-id` reducer (one for each sequence and each question in the questionnaire), to add multiple entries in the `code-by-id` reducer (one for each code in every code list in the questionnaire)...
16. The application re renders. The questionnaire content is now visible.

## Integrity checks

The main reducer for this application is build dynamically to process [integrity checks](/doc/implementation-details/integrity-checks.md) on the questionnaire.
