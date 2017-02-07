# Dispatch actions

In the last section, we built a reducer which given the following action, returned a new state where the label for the corresponding code had been updated:

```javascript
const anAction = {
  type: 'EDIT_CODE_LABEL', //what kind of action happened
  payload: { //details about this action
    id: 'code_2', //which code are we dealing with ?
    label: 'regular happy' //the new label
  }
}
```

We also saw that thanks to the [connect](/react-redux/introduction-to-store.html#connect) mechanism from React Redux, our application renders according to the data containing in the store.

The missing part here consists of telling to the store that an action occurred, in order to make the reducer return the new state. This what is called "dispatch an action" to the store. We don't necessarily need React Redux for this, but here again, the React Redux `connect` function makes things easy.

## Action creator

First, let's wrap our action with a function, which given a code id and a value, will return the corresponding action:

```javascript
function editCodeLabel(id, label) {
  return {
    type: 'EDIT_CODE_LABEL',
    payload: {
      id, //ES1015 shorthand for id: id
      label
    }
  }
}
```

*Read more about the [shorthand]((/javascript/syntax.md#shorthand-property-names) notation.*

Then, our action can be created with:

```javascript
const anAction = editCodeLabel('code_2', 'regular happy')
```

The `editCodeLabel` function is called an [action creator](http://redux.js.org/docs/basics/Actions.html#action-creators).

## Use connect second argument

We can then extend our [previous example](/react-redux/introduction-to-store.md) by giving a second argument to the connect function:

```javascript

//We assume the `editCodeLabel` function above was defined in a file called
//`actions`
import { editCodeLabel } from './actions'

...

//The component will receive a new prop: a function named `editCodeLabel`. This
//function is not the `editCodeLabel` function we imported, but a new function
//provided by the connect mechanism.
function CodeListEditorDumb({ codes, editCodeLabel }) {
  return (
    ...
      {
        codes.map(({ id, label }, i) => 
          //We use `editCodeLabel` to handle changes in each code editor, (we
          //use an arrow function to give the proper id as a first argument)
          <CodeEditor 
            key={id} label={label}
            handleChange={val => editCodeLabel(id, val)} />)    
      }
    ...
  )
}

const mapStateToProps = ...


//The connect second argument is often called `mapDispatchToProps`. In its
//simplest version, it is an object where each key represents an action
//creator (ie a function which returns an action)
const mapDispatchToProps = {
  editCodeLabel: editCodeLabel //we could use ES2015 shorthand notation
}

export default 
  connect(mapStateToProps, mapDispatchToProps)(CodeListEditorDumb)
```

When the `editCodeLabel` function is called from the `CodeListEditor` component (more precisely from a `CodeEditor` component), the returned value of the raw `editCodeLabel` function will be dispatched to the store. In other words, the [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) mechanism wraps the action creator with a dispatch call to the store.

To help you grasp what `connect` did to the initial `editCodeLabel` function, you can consider that it replaced it with the following `editCodeLabelAfterConnect` function:

```javascript 
function editCodeLabelAfterConnect(id, value) {
  //the connect mechanism can access the store
  store.dispatch(editCodeLabel(id, value))
} 
```

You can play with this [pen](http://codepen.io/BoogalooJB/pen/ZLrYev). Notice that the codes are updated and the UI re-rendered.


<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="ZLrYev"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
