# A component with Redux

Before diving more into `Redux`, let's have a look at what the code will look like after switching to `Redux` to represent the application state: 

```javascript
function CodeListEditor({ codes, addCode, editCodeLabel }) {
  return (
    <ul>
      { 
        codes.map(( {id, label }) => 
          <li key={code}>
            <CodeEditor
              id={id}
              label={label}
              handleChange={val => editCodeLabel(id, val)}
               />
          </li>
        )
      }
    </ul>
  )
}
```

The code editor by itself will not be impacted (it was already a stateless component, so it did not contain any state).

Notice that the `CodeListEditor`:
- is now a stateless component represented as a function;
- is supposed to be passed by its parent some props: the codes the code list is made of, a function to add a code and one to edit a code (in order to make a fully functional component, we should also pass it some functions to move up, move down and remove a code).

In the next sections, we will see:
- how to model the application state;
- how to make a component use some piece of state stored in the application state;
- how to make the application state change when actions occur.