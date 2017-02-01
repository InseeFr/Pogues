# Reducers and actions

The reducer we used in the last section was trivial: the state  never changes. As a consequence, we were not able to process user actions. In order to build a more useful reducer, we need to have a closer look at the reducer second argument: the action.

An action is a plain javascript object describing what happened. For instance, the following action can be used to describe what the user did when he edited a code label:

```javascript
const anAction = {
  type: 'EDIT_CODE_LABEL', //what kind of action happened
  payload: { //details about this action
    id: 'code_2', //which code are we dealing with ?
    label: 'regular happy' //the new label
  }
}
```

If we pass this action as a second argument to our reducer (with the state used in the last section as its first argument), we expect it to return a new state, where the label for the code with id `code_2` has been replaced with "regular happy".

```javascript
const previousState = {
  codeListById: {...}
  codeById: {
    ...
    code_2: {
      label: 'happy'
    }
    ...
  }
}

const newState = simpleReducer(previousState, anAction)
```
We expect `newState` to equal to:

```javascript
{
  codeListById: {...}
  codeById: {
    ...
    code_2: {
      //the only change concerns the code_2 label
      label: 'regular happy'
    }
    ...
  }
}
```

In order to achieve this, here is a possible implementation of the reducer:

```javascript
function simpleReducer(state, action) {
  if (action.type === 'EDIT_CODE_LABEL') {
    return {
      //codeListById will not be impacted by this action, since it only keeps
      //track of code ids, not code lables
      codeListById: state.codeListById,
      codeById: {
        //see notes above if the syntax bothers you
        //we keep all the codes unchanged...
        ...state.codeById,
        //...except for the code which was edited, which needs to be updated to
        //take into account the new label
        [action.payload.id]: {
          label: action.payload.label
        }
      }
    }
  }
  //we return the current state: the action is not supposed to have any effect
  //on the state
  else return state
}
```

A reducer should be a [pure function](http://redux.js.org/docs/introduction/ThreePrinciples.html#changes-are-made-with-pure-functions), which means that it cannot mutate the initial state. The following implementation would not comply to this rule:

```javascript
function simpleReducer(state, action){
  if (action.type === 'EDIT_CODE_LABEL') {
    state.codeById[action.payload.id].label = action.payload.label
  }
  return state
}
```

It returns the expected new state (with the label 'regular happy' for `code_2`), 
but it mutated the initial state (in fact, the initial state and the next state
are the same object).

The reducer implementation uses [the spread operator with objects](/doc/javascript/syntax.md#spread-operator-with-objects)  and [computed property names](/doc/javascript/syntax.md#computed-property-names) to make writing immutable update shorter.

## Initial state

A reducer takes a previous state and an action, and returns a new state. At initialization, no previous state is available. A common pattern is to use [ES2015 default parameters](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Default_parameters) to give our state an initial value. In our example, we could use the hard coded state we worked with:

```javascript
const initialState = {
  codeListById: {
    code_list_1: { ... },
    ...
  },
  codeById: {
    code_1: { ... },
    ...
  }
}

function myReducer(state=initialState, action) {
  ...
}
```
