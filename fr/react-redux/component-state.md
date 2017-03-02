# L'état d'un composant

## La mauvaise approche

Essayons d'abord d'ajouter simplement un code en actualisant le tableau contenant les codes, et en affichant ensuite dans la log ce tableau. On s'attend au niveau de l'interface à ce que le nouveau code apparaisse en dessous du troisième code.

```javascript
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
  const handleClick = () => {
    codes.push({ id: 'code_4', label: 'very unhappy' })
    console.log('codes:', codes)
  }
  return (
    <div>
      <button onClick={handleClick} />
      ...
    </div>
  )
}
```

<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="dNzZxG"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues - Listening to events - The wrong way"
  class="codepen" />


On remarque que cette approche ne fonctionne pas: les codes semblent avoir été actualisés (il y a maintenant 4 codes dans le tableau), mais l'interface n'a pas changé.

C'est une caractéristique essentielle de React: **l'application est actualisée seulement lorsque la méthode `setState` d'un composant est appelée**.

## La bonne approche

 Pour utiliser cette méthode `setState`, nous devons au préalable effectuer quelques ajustements au composant `CodeListEditor` et utiliser une [syntaxe différente]((https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components) pour décrire le composant:

```javascript
import React from 'react'
class CodeListEditor extends React.Component {
  render() {
    const codes = ...
    return (
      <div>
        <button onClick={handleClick} />
        ...
      </div>
    )
  }
}
```

Nous avons juste copié le corps de notre fonction décrivant le composant dans une autre fonction: la méthode `render`d'une [classe ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) qui hérite de `React.Component`.

Pour l'instant, rien n'a changé: l'interface ne s'actualise toujours pas lorsque l'on ajoute un code. Mais cette syntaxe offre de nouvelles options. Parmi elles, la possiblité d'appeler la méthode `setState` pour indiquer au composant que quelque chose a changé et qu'il doit être ré-affiché.

```javascript
import React from 'react'
class CodeListEditor extends React.Component {
  constructor() {
    super()
    //on initialise l'état du composant avec 3 codes
    this.state = {
      codes: [{
        id: 'code_1',
        label: 'unhappy'
      }, {
        id: 'code_2',
        label: 'happy',
      }, {
        id: 'code_3',
        label: 'very happy'
      }]
    }
    this.addCode = () => {
      const { codes } = this.state
      const newId = `code_${codes.length+1}`
      //Au lieu de mettre à jour les codes directement, avec `codes.push`, on
      //préfère réaliser dans un premier temps une copie des codes initiaux et
      //ajouter dans un second temps le nouveau code à la fin.
      const newCodes = [...codes, { id: newId, label: 'very unhappy' }]
      //On peut désormais utiliser `setState` pour prendre en compte ce nouveau
      //tableau dans l'état du composant. L'appel à la méthode `setState`
      //déclenche une actualisation du composant.
      this.setState({
        codes: newCodes
      })
    }
  }
  render() {
    //Les codes sont maintenant extraits de l'état du composant
    const { codes } = this.state
    return (
      <div>
        {/* on utilise la méthode `addCode` définie dans le constructeur */}
        <button onClick={this.addCode}>Add a code</button>
        <div>
        {
          codes.map(({ id, label }) => <CodeEditor key={id} label={label} />)
        }
        </div>
      </div>
    )
  }
}
```

On initialise l'état du composant `CodeListEditor` avec les 3 codes déjà existants. Puis, on définit la fonction `addCode` (cf. [fonctions flêchées](/javascript/syntax.md#fonctions-flêchées)) qui:
- crée un identifiant pour le nouveau code;
- réalise une copie des codes précédents et ajoute le nouveau code à la fin (cf. [utilisation de l'opérateur ... avec les tableaux](JavaScript/syntax.html#spread-operator-with-arrays));
- appelle `setState` pour mettre à jour l'état du composant; cet appel à `setState` va déclencher un réaffichage du composant.

Désormais, lorsque l'on clique sur le bouton "Add a code", l'interface est actualisée de manière cohérente.

Testez le code avec ce [pen](http://codepen.io/BoogalooJB/pen/VPMQby).

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="VPMQby"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
