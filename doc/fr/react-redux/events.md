# Réagir aux événements

Pour l'instant, l'écran est composé de 3 composants `CodeEditor`, chacun avec un libellé différent. Voyons ce qu'il se passe si l'on essaye d'ajouter un nouveau code. On peut ajouter un gestionnaire d'événements au bouton "Add a code":

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

Si vous ouvrez la console (à partir des outils de développement du navigateur ou en ouvrant le pen avec Code Pen et en utilisatnt le bouton "Console" en bas de l'écran) et que vous cliquez sur le bouton "Add a code", le message est affiché. Dans la prochaine section, nous essaierons d'ajouter réellement un code.

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
