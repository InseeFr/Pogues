# Passer des paramètres aux composants

Faisons l'hypothèse que nous avons déjà créé 3 codes, et que chaque code a un `id` et un `label`. Nous les coderons en dur dans le composant `CodeListEditor` pour l'instant. Voyons comment afficher le bon libellé au sein de chaque `CodeEditor`.

```javascript
//on ignore les `import` et les `export` pour simplifier

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

Remarquons que:
- nous avons mélangé du `JSX` et du `JavaScript`; `{ codes.map(...)} ` renvoie un tableau de `CodeEditor`s qui seront insérés dans la balise `div` (en savoir plus à propos de l'[affectation par décomposition](/javascript/syntax.md#destructuring) utilisée dans l'appel à la fonctoin `map`);
- nous avons passé des paramètres au composant `CodeEditor` de la même façon que l'on définit des attributs pour un élément `html`;
- nous avons passé un paramètre `key` à chaque `CodeEditor`: `React` requiert que [chaque composant dans un tableau ait un attribut key](https://facebook.github.io/react/docs/lists-and-keys.html#basic-list-component) avec une valeur unique.

Pour l'instant, le composant `CodeListEditor` n'a pas changé visuellement. Il présente toujours le même libellé "unhappy" pour chaque code. Afin de valoriser le paramètre `label` au sein du `CodeEditor`, il est nécessaire de modifier ce composant:

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

Lorsqu'il est appelé, un composant décrit grâce à une fonction recevra en tant que premier et unique argument un objet avec tous les paramètres passés par son parent. Cet objet est appelé [props](https://facebook.github.io/react/docs/components-and-props.html). Pour le premier des 3 `CodeEditor`s, il prend la forme suivante:

```javascript
{
  key: 'code_1',
  label: 'unhappy'
}
```

La plupart du temps, nous utiliserons l'[affectation par décomposition](/javascript/syntax.md#destructuring) pour extraire l'information des props. Notre composant peut ainsi être ré-écrit de la façon suivante:

```javascript
function CodeEditor({ label }) {
  return (...)
}
```

Dans les prochains chapitres, nous verrons comment faire réagir nore composant lorsque l'utilisateur clique sur le bouton "Add a code".

Vous pouvez tester le code avec ce [pen](http://codepen.io/BoogalooJB/pen/EZwbpd)

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

