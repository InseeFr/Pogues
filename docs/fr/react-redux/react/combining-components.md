# Associer des composants

Voyons comment utiliser le composant simple `CodeEditor` pour construire un composant plus complexe, le `CodeListEditor`.

```javascript
import React
import CodeEditor from './code-editor'

export default function CodeListEditor() {
  return (
    <div>
      {/* 
        Nous n'implémenterons pas l'édtion du libellé de la liste de codes.
        Remarquons que les commentaires en JSX diffèrent des commentaires HTML.
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

Jusqu'à maintenant, chaque `CodeEditor` est identique, avec comme libellé "unhappy". Dans la section suivante, nous verrons comment passer des paramètres à un composant pour le personnaliser.

Essayez le code avec ce [pen](http://codepen.io/BoogalooJB/pen/ggGXvp).

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="ggGXvp"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
