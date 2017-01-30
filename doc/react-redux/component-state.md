# Component state

## The wrong way

Let's first try to simply add a code by updating the array of codes, and then log the updated codes. We expect the new code to appear below the third code.

```javascript
function CodeListEditor() {
  const codes = [{
    id: 'code_1',
    label: 'unhappy'
  }, {
    id: 'code_2',
    label: 'happy',
  }, {
    id: 'code_3',
    label: 'very happy'
  }]
  const handleClick = () => {
    codes.push({ id: 'code_4', label: 'very unhappy' })
    console.log('codes:', codes)
  }
  return (
    <div>
      <button onClick={handleClick} />
      ...
    </div>
  )
}
```

<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="dNzZxG"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues - Listening to events - The wrong way"
  class="codepen" />


As you notice, it does not quite work: the codes seem to have been updated (there are now 4 codes in our array), but the UI stayed the same.

This is a key feature of React: **the app will only be re-rendered when a `setState` method is called somewhere**. To use the `setState` method, we will need to make some adjustments to our `CodeListEditor`. Let's rewrite it this way:

## The right way

To use the `setState` method aforementioned, we need to use a different [syntax]((https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components) to describe the component: 

```javascript
import React from 'react'
class CodeListEditor extends React.Component {
  render() {
    const codes = ...
    return (
      <div>
        <button onClick={handleClick} />
        ...
      </div>
    )
  }
}
```

We've just copied the body from our component function to the body of another function: the `render` method of a [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) which extends `React.Component`.

For now, nothing has changed: the UI is still not updating when we try to add a code. But this syntax exposes some additional functionalities. Among them is the option to call the `setState` method to tell the component something has changed and it should be re-rendered. 

```javascript
import React from 'react'
class CodeListEditor extends React.Component {
  constructor() {
    super()
    //we initialize the state with the 3 codes
    this.state = {
      codes: [{
        id: 'code_1',
        label: 'unhappy'
      }, {
        id: 'code_2',
        label: 'happy',
      }, {
        id: 'code_3',
        label: 'very happy'
      }]
    }
    this.addCode = () => {
      const { codes } = this.state
      const newId = `code_${codes.length+1}`
      //Insead of updating the codes in place, with `codes.push`, we prefer to
      //make a copy of the initial codes and append the new code at the end.
      const newCodes = [...codes, { id: newId, label: 'very unhappy' }]
      //we can now use `setState` to make this new array of codes part of the
      //component state. The `setState` call will trigger a re-rendering of the
      //component.
      this.setState({
        codes: newCodes
      })
    }
  }
  render() {
    //codes should now be extracted from the component state
    const { codes } = this.state
    return (
      <div>
        {/* we use the `addCode` method defined in the constructor */}
        <button onClick={this.addCode}>Add a code</button>
        <div>
        {
          codes.map(({ id, label }) => <CodeEditor key={id} label={label} />)
        }
        </div>
      </div>
    )
  }
}
```

We intitialize the state of the `CodeListEditor` component with the 3 already created codes. We then define a `addCode` function (see [arrow functions](/doc/implementation-details/javascript.md#arrow-functions)) which will make a copy of the codes.

- we create an `id` for the newly created code;
- we create a copy of the initial codes with a new code at the end (see [spread operator]()) ;
- we use `setState` to update the state of our component; the `setState` call will trigger a re-rendering of the component.

Now, when we click on the "Add a code" button, the UI updates accordingly.

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="VPMQby"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
