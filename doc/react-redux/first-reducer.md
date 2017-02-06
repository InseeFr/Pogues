# Introduction to store

## Simple Reducer

As it has already been said, the application state will be held by a Redux store. To create a Redux store, we first need to define a [reducer](http://redux.js.org/docs/basics/Reducers.html). A reducer is a function which takes the application state and an action, and returns a new version of the application state.

To keep things simple for now, we will create a simple reducer which always return the application state from the previous section (we do not value the action for the moment):

```javascript
function simpleReducer(state, action) {
  return {
    codeListById: {
      code_list_1: { //we will actually use random ids
        label: 'mood',
        codes: ['code_1', 'code_2', 'code_3']
      },
      ...
    },
    codeById: {
      code_1: {
        label: 'unhappy',
      },
      ...
    }
  }
}
```

## Set up

We can then bootstrap the application:
- we build a `redux` store with the Redux `createStore` function which takes the reducer as its first argument;
- we wrap the `CodeListEditor` component with the [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) component from [React Redux](https://github.com/reactjs/react-redux); this will make the store available to each component in the application through the [React Redux connect](#connect) mechanism.

See [bootstraping the application](/doc/application/bootstrap.md) for a more detailed presentation of these steps.

```javascript
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(simpleReducer)

ReactDOM.render(
  <Provider store={store}>
    <CodeListEditor id="code_list_1" />
  </Provider>,
  document.getElementById('base')
)
```

Notice we passed some props to the code list editor: we provided the `id` of the code list we want to edit.

## Connect

With this set up, we can now [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) the `CodeListEditor` component to the store.

```javascript
import { connect } from 'react-redux'

//The codes will be passed to the `CodeListEditor` through the `connect`
//mechanism. We renamed our `CodeListEditor` function to `CodeListEditorDumb`
//to differentiate it from the component which will be eventually exported
//(see last line).
function CodeListEditorDumb({ codes }) {
  return (
    <div>
      <button onClick={() => console.log('trying to add a code')}>
        Add a code
      </button>
      <div>
      {
        codes.map(({ id, label }, i) => 
          <CodeEditor 
            key={id} label={label}
            handleChange={val => console.log('a code has changed', val)} />)    
      }
      </div>
    </div>
  )
}

//`mapStateToProps` will extract the codes from the state. Its second argument
//(`ownProps`) is the component props. These props were passed through
// `<CodeListEditor id="code_list_1" />`in the set up. Hence, it is an object
//with an entry called `id`.
const mapStateToProps = (state, ownProps) => {
  //code list id
  const codeListId = ownProps.id
  //For a code list with a given id, we first need to extract an array with
  //the ids this code list is made of.
  const codeIds = state.codeListById[codeListId].codes
  //Then, for each code, we extract some detailed information from the state
  //through the `codesById` entry. Since `CodeEditor` expects a code to look
  //like `{id: 'code_1', label: 'unhappy' }`, we build the codes according to
  //this requirement.
  return codeIds.map(id => ({
    id: id,
    label: state.codeById[id].label
  }))
}

export default connect(mapStateToProps)(CodeListEditorDumb)
```

Notice that the `CodeListEditorDumb` expects to be passed an array of `codes`, but
when we instantiate the `CodeListEditor` within the `Provider` with `<CodeListEditor id="code_list_1" />`, we passed it the id of the code list. Taking this `id` and returning the corresponding list of codes is what `mapStateToProps` will take care of. Then, `connect` will use `mapStateToProps`to wrap the initial component into a higher order component, which given some `id`, will retrieve the codes from the application state, and render the initial component with these codes passed as a prop.

In practice, we don't need to rename our initial component `CodeListEditorDumb`, since this name is only used locally (in the connect call at the end of the file). See [export default](/doc/javascript/syntax.md#exports) to learn more about how exports work.

Our `CodeListEditor` will now be able to get the information directly from the store. But when we try to add or edit a code, nothing happens except for the logged information in the console. In the next sections, we will see how to use actions to make things happen.

You can play with this [pen](http://codepen.io/BoogalooJB/pen/egyeJz)

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="egyeJz"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
