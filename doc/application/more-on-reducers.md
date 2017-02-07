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
    //start with a fresh copy of the state
    ...codes,
    //add the new entry
    [id]: {
      id, label, value
    }
  }
}

...
```

The generic utility function could benefit to be shared by all the reducers (instead of being defined inline in each reducer).

## Reducers handle collections of entities

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

## Integrity checks

The main reducer for this application is build dynamically to process [integrity checks](/doc/implementation-details/integrity-checks.md) on the questionnaire.