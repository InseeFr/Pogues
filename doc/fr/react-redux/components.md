# Les composants avec React

Un élément visuel avec React est appelé un composant. Nous travaillerons dans un premier temps à partir d'une version simplifiée du composant `CodeEditor` défini dans le fichier [src/js/components/code-editor.js](https://github.com/InseeFr/Pogues/blob/master/src/js/components/code-editor.js):

!["Le composant CodeEditor"](../img/code-editor.png "Le composant CodeEditor")

Afin de promouvoir la conception de composants réutilisables et l'écriture de code modulaire, les composants doivent être aussi élémentaires que possible. Avec cette approche, on peut ensuite construire des composants de plus haut niveau en [associant des composants simples](./combining-components.md). De ce point de vue, le composant `CodeEditor` devrait être considéré comme l'association de plusieurs composants élémentaires:
- le champ de saisie;
- le groupe de boutons, qui devrait lui même être scindé en plusieurs composants, un pour chaque bouton.

Cela étant, afin de simplifier et de rester proche du code existant, nous considérerons le composant `CodeEditor` comme un bloc élémentaire.

Si l'on ignore les instructions relatives au style et à la mise en page, le code `html`pour l'éditeur de code ressemble à:

```html
<div>
  <input type="text" defaultValue="very unhappy" />
  <div class="controls">
    <button class="up"></button>
    <button class="down"></button>
    <button class="removetrash"></button>
  </div>
</div>
```

Cela peut-être représenté avec React de la façon suivante:

```javascript
import React from 'react'

export default function CodeEditor() {
  return (
    <div>
      <input type="text" defaultValue="very unhappy" />
       <div className="controls">
          <button className="up"></button>
          <button className="down"></button>
          <button className="remove"></button>
       </div>
    </div>
  )
}
```

Remarquons que:
- le composant `CodeEditor` est représenté par une fonction;
- cette fonction retourne ce qui ressemble à de l'`html`; cette syntaxe s'appelle `JSX` et est pratique pour décrire des composants; au cours de la [compilation](/application/build-process.md), ce code `JSX` sera transformé en code `JavaScript`, et, au final, cette fonction renverra un élément React;
- il y a de légères différences entre `JSX` et `html` (ici, l'attribut `className` est utilié au lieu de l'attribut `class`, et l'attribut `defaultValue` à la place de `value`);
- on exporte (cf. [exports](/javascript/syntax.md#export-and-import)) le composant afin de pouvoir l'utiliser ultérieurement pour construire le composant `CodeListEditor`.

Il est nécessaire d'indiquer à React que l'application doit être affichée au sein d'une balise `div` de la page [src/index.html](https://github.com/InseeFr/Pogues/blob/master/src/index.html). On utilise pour cela la méthode `ReactDOM.render` (cf. [amorcer l'application](doc/application/bootstrap.md)).

```javascript
ReactDOM.render(
  <CodeEditor />,
  document.getElementById('base')
)
```

Pour tester le code, vous pouvez partir de ce [pen](http://codepen.io/BoogalooJB/pen/PWJOEP) (tout le code est dans un seul pen, donc il n'y a pas d'instruction `import` ou `export`). 

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="PWJOEP"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />


<!-- pen content
//bootstrap the application (you can ignore this for now)
ReactDOM.render(
  <CodeEditor />,
  document.getElementById('base')
);


function CodeEditor() {
  return (
    <div>
      <input
         type="text"
         value="very unhappy" />
       <div className="controls">
          <button className="up" />
          <button className="down" />
          <button className="remove" />
       </div>
    </div>
  )
}
-->