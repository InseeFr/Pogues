# Reducers - Split and combine

We can now try to implement the "add a code" functionality. We need:
- to add a new action creator;
- to process the corresponding action within the reducer.

The action creator needs to know which code list we're adding a code to:
```javascript
let lastId = 0
function addCode(codeListId) {
  return {
    type: 'ADD_CODE',
    payload: {
      codeListId,
      id: `new_code_${lastId++}`
    }
  }
}
```

Notice we gave an id to our code. To keep things simple, we created an incremental id, but in the real application we use a [randomly generated id](https://github.com/InseeFr/Pogues/blob/d28a7f67894479807f6b3d1c45b1b24883a556c4/src/js/utils/data-utils.js#L12-L13).

The reducer logic gets more complex: 

```javascript
function simpleReducer(state, action) {
  if (action.type === 'EDIT_CODE_LABEL') {
    ...
  }
  else if (action.type === 'ADD_CODE') {
    //get the relevant code list
    const codeList = state.codeListById[payload.codeListId]
    //get the actual codes for the code list
    const codes = codeList.codes
    //add the code id at the end
    const newCodesIds = [...codeIds, payload.id]
    //update `codeListById` with the new codes
    const codeListById = {
      ...state.codeListById,
      [payload.codeListId]: {
        ...codeList,//we keep all exiting keys in the code list (here the
                    //code list label)
        codes: newCodesIds //we udpate the codes key
      }
    }
    //we update the codes by adding an entry for the new code
    const codeById = {
      ...state.codeById,
      [payload.id]: {
        label: ''
      }
    }
    //we return the new state
    return {
      codeListById,
      codeById
    }
  }
  //we return the current state: the action is not supposed to have any effect
  //on the state
  else return state
}
```

The code gets quickly very long: we need to process the effects on the different state's entries, without mutating the initial state (which would have made the code shorter). Thanks to the way we shape our state (one entry per kind of entity with references across entities based on ids, as opposed to a nested structure where code lists would contain code descriptions), we can easily split our main reducer into two smaller reducers, working independently one from another:
- a reducer to handle the code lists;
- a reducer to handle the codes.

We then [combine](http://redux.js.org/docs/api/combineReducers.html#combinereducersreducers) these reducers to handle all the application logic.

```javascript
import { combineReducers } from 'redux'

function codeListByIdReducer(state, action) {
  const { type, payload } = action
  if (type === 'ADD_CODE') {
    const codeList = state[payload.codeListId]
    return {
      ...state,
      [payload.codeListId]: {
        ...codeList,
        codes: [...codeList.codes, payload.id]
      }
    }
  }
  else return state
}

function codeByIdReducer(state, action) {
  const { type, payload } = action
  if (type === 'EDIT_CODE_LABEL') {
    const code = state[payload.id]
    return {
      ...state,
      [payload.id]: {
        ...code,
        label: payload.label
      }
    }
  }
  else if (action.type === 'ADD_CODE') {
    return {
      ...state,
      [payload.id]: {
        label: ''
      }
    }
  }
  else return state
}

const mainReducer = combineReducers({
  codeListById: codeListByIdReducer,
  codeById: codeByIdReducer
})
```

We can now update our `CodeListEditor` component to pass it the `addCode` function (the action creator wrapped into a dispatch call through the connect mechanism):

```javascript
//The `addCode` action creator  needs to be passed the id of the code list
//we're adding a code to. Hence, the `addCode` function passed to the
//`CodeListEditorDumb` component (which wraps the action creator with
//a dispatch call) needs this argument too. It is available through the `id`
//prop: when we call `<CodeListEditor id='code_list_1' />`, the `id` prop is
//passed to the `CodeListEditorComponent`, and the connect mechanism will make
//this prop follow up to the `CodeListEditorDumb` component.
function CodeListEditorDumb({ id, codes, editCodeLabel, addCode }) {
  return (
    <div>
      <button onClick={() => addCode(id) }>
        Add a code
      </button>
      <div>
      ...
    </div>
  )
}
```

Play with this [pen](http://codepen.io/BoogalooJB/pen/bgLVEZ)
<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="bgLVEZ"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
