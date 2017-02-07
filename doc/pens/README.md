# CodePen

This documentation embeds [Code Pen](https://codepen.io/) pens to illustrate how the code works. This folder contains the raw source for these pens.

## Code Pen configuration

Code Pen was configured to use `Babel` as a JavaScript preprocessor, and rely on the following external files:

https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js
https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js
https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js
https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.2/react-redux.min.js

## HTML

The following `html` should suffice for all the pens.

```html
<div id="base">
<div>
```

## CSS

The following `css` should suffice for all the pens.

```css
#base {
  padding: 20px; 
}

.controls {
  display: inline-block;
}

.up::before {
  content: '↑'
}

.down::before {
  content: '↓'
}

.remove::before {
  content: '×'
}


.debug {
  margin-top: 20px;
  padding-top: 20px;
  border-top: solid #ccc 1px;
  color: red;
  font-family: monospace;
}
```

## Code

- [react-redux/component.md](./code-editor-component.js)

TODO keep up to date