# Combining components

Let's see how we can use this simple `CodeEditor` component to build the more complex `CodeListEditor` component. 

```javascript
import React
import CodeEditor from './code-editor'

export default function CodeListEditor() {
  return (
    <div>
      {/* 
        We won't implement the edition of the code list Label.
        Notice that comments look like different from HTML in JSX.
      */}
      <button>Add a code</button>
      <div>
        <CodeEditor />
        <CodeEditor />
        <CodeEditor />
      </div>
    </div>
  )
}
```

Until now, each `CodeEditor` looks exactly the same, with `unhappy` as a label. In the next section, we will see how to give some parameters to a component.

Play with this [pen](http://codepen.io/BoogalooJB/pen/ggGXvp).

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="ggGXvp"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
