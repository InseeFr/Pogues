# Passing props to components

Let's assume we've already created 3 codes, and that each code has an `id` and a `label`. We will hard coded them in the `CodeListEditor`  body for now. Let's see how we can make each `CodeEditor` show the right label.

```javascript
//we skip `import` and `export` for the sake of brevity

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
  return (
    <div>
      <button>Add a code</button>
      <div>
      {
         codes.map(({ id, label }) => <CodeEditor key={id} label={label} />)
      }
      </div>
    </div>
  )
}
```

Notice that:
- we mixed `JSX` and regular `javascript`; `{ codes.map(...)} ` will return an array of `CodeEditor` that will be inserted in the `div` (more about the [destructuring assignment](/javascript/syntax.md#destructuring) used in the `map` call);
- we passed some props to the `CodeEditor` component the same way we set attributes to an `HTML` element.
- we pass a property named `key` to each `CodeEditor`: `React` requires [each component in an array to have a key attribute](https://facebook.github.io/react/docs/lists-and-keys.html#basic-list-component) with a unique value.

For now, our `CodeListEditor` will still look the same, with the "unhappy" value for each code. In order to value the `label` prop within `CodeEditor`, we need to update our component:

```javascript
function CodeEditor(props) {
  const { label } = props
  return (
    <div>
      <input type="text" defaultValue={label} />
       <div className="controls">
          <button className="up"></button>
          <button className="down"></button>
          <button className="remove"></button>
       </div>
    </div>
  )
}
```

When called, a component described as a function will receive as its first and only argument an object with all the data passed by its parent. This object is called [props](https://facebook.github.io/react/docs/components-and-props.html). For the first of the three code editors, it looks like this:

```javascript
{
  key: 'code_1',
  label: 'unhappy'
}
```

Most of the time, we will use [object destructuring](/javascript/syntax.md#destructuring) to extract data from props. Our component can then be rewritten this way:

```javascript
function CodeEditor({ label }) {
  return (...)
}
```

In the next sections, we will see how to make the component react when a user clicks the "Add a code" button.

Play with this [pen](http://codepen.io/BoogalooJB/pen/EZwbpd)

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="EZwbpd"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />

