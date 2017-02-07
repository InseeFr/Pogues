# Control the input

In order to make a code label editable, we will need to pass to each `CodeEditor` a function that will update the codes held by the `CodeListEditor` state. For this, we will add the new method `editCodeLabel` to the `CodeListEditor` component:

```javascript
 class CodeListEditor extends React.Component {
   constructor(){
     ...
     //it will update the label for the code at index `i`
     this.editCodeLabel = (i, newLabel) => {
       //we make a copy of the initial codes
       const newCodes = [...this.state.codes]
       //we edit the code at index `i`
       newCodes[i] = {
         //we use the spread operator to start with a copy of the code (a good
         //practice to get used to in order to avoid object mutations)
         ...newCodes[i],
         //we update the `label`
         label: newLabel
       }

       this.setState({
         codes: newCodes
       })
     }
   }

   render() {
     return (
      <div>
        <button onClick={this.addCode}>Add a code</button>
        <div>
        {
          codes.map(({ id, label }, i) => 
            //`editCodeLabel` method will be used internally by the
            //`CodeEditor` component
            <CodeEditor 
              key={id} label={label}
              handleChange={value => this.editCodeLabel(i, value)}  />)
        }
        </div>
      </div>
     )
   }
 }
 ```

We passed a new prop to the `CodeEditor` components: `handleChange` is the function the component will need to call to take into account label updates. To do that, we need to modify the `CodeEditor` component: 

 ```javascript
 function CodeEditor({ label, handleChange }) {
  return (
    <div>
      <input type="text"
             value={label}
             onChange={e => handleChange(e.target.value)} />
       <div className="controls">
          <button className="up"></button>
          <button className="down"></button>
          <button className="remove"></button>
       </div>
    </div>
  )
}
```

We added the `onChange` event handler. The function will be passed a [synthetic event](https://facebook.github.io/react/docs/handling-events.html), which just works like regular `DOM` events. So we use this event to get the value of the current input.
We also had to swtich the `defaultValue` attribute of the `input` field to `value` to say to React that this input will be updated from the code.

We could in the same way implement the remove, move up and move down functionalities.

We did not cover how the `CodeListEditor` will receive the initial codes. Obviously, in a real world scenario, these won't be hard coded in the constructor. It is part of the next sections.

<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="LxezaL"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>