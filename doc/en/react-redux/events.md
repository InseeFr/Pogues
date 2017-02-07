# Listening to events

So now, we have three `CodeEditor`, each one with a different label. Let's see what happens if we want to add a new code. We can add an event handler to the "Add a code" button:

```javascript
function CodeListEditor() {
  return (
    <div>
      <button onClick={() => console.log('trying to add a button')}>
        Add a code
      </button>
      ...
    </div>
  )
}
```

If you open a console (open the developer tools for your browser or open the pen in Code Pen and use the console button at the bottom of the screen) and you click on the "Add a code button", the message will be shown. In the next section, we will try to make something more useful happen when a user clicks the button.

Play with this [pen](http://codepen.io/BoogalooJB/pen/LxzOMo).

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="LxzOMo"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />