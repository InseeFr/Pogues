# Controller le champ de saisie

Afin de rendre le libellé d'un code éditable, il est nécessaire de passer à chaque `CodeEditor` une fonction qui met à jour les codes sauvegardés au sein de l'état du composant `CodeLlistEditor`. Pour cela, nous ajoutons la méthode `editCodeLabel` au composant `CodeListEditor`:

```javascript
 class CodeListEditor extends React.Component {
   constructor(){
     ...
     //mettre à jour le libellé pour le code à la position `i`
     this.editCodeLabel = (i, newLabel) => {
       //copie des codes de départ
       const newCodes = [...this.state.codes]
       //édition du code à la position `i`
       newCodes[i] = {
         //on utilise l'opérateur ... pour réaliser une copie du code (bonne
         //pratique pour s'habituer à éviter les mutations des objets)
         ...newCodes[i],
         //on met à jour le libellé
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
            //la méthode `editCodeLabel` sera utilisée pour le composant
            //`CodeEditor`
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

Nous avons passé un nouveau paramètre au composant `CodeEditor`: `handleChange` est une fonction que le composant utilisera pour mettre à jour le libellé du code. Pour prendre en compte cette évolution, il convient de modifier le composant `CodeEditor`: 

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

Nous avons ajouté le gestionnaire d'événements `onChange`. Cette fonction recevra un [synthetic event](https://facebook.github.io/react/docs/handling-events.html) qui foncionne comme les événements traditionnels du `DOM`. On utilise donc cet événement pour récupérer la valeur du champ. Nous avons également renommé l'attribut `defaultValue` en `value` pour indiquer à React que ce champ sera désormais mis à jour à partir du code.

On pourrait de façon analogue implémenter les fonctions supprimer et déplacer un code.

Nous n'avons pas indiqué pour l'instant comment le composant `CodeListEditor` recevra les codes initiaux. En pratique, bien sûr, ces codes ne seront pas codés en dur au sein du composant.

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