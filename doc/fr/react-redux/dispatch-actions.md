# Envoyer des actions

Dans le précédent chapitre, nous avons construit un reducer qui à partir de l'action représentée ci-dessous, renvoie un nouvel état de l'application où le libellé pour le code concerné a été mis à jour:

```javascript
const anAction = {
  type: 'EDIT_CODE_LABEL', //quel type d'action a eu lieu ?
  payload: { //détails à propos de cette action
    id: 'code_2', //quel code est concerné ?
    label: 'regular happy' //que est le nouveau libellé ?
  }
}
```

Nous avons également vue que grâce au mécanisme de [connexion](/react-redux/introduction-to-store.html#connect) fourni par React Redux, notre application s'affiche à partir de l'information contenue dans le store.

Il nous reste à voir comment notifier le store lorsqu'une action a eu lieu: le reducer doit retourner le nouvel état de l'application. C'est ce qui s'appelle "envoyer une action" au store. Il n'est pas indispensable d'utiliser React Redux pour cela, mais ici encore, la fonction `connect` rend les choses plus simples.

## Créateur d'actions

D'abord, encapsulons notre action dans une fonction qui à partir de l'identifiant d'un code et d'une valeur retournera l'action correspondante:

```javascript
function editCodeLabel(id, label) {
  return {
    type: 'EDIT_CODE_LABEL',
    payload: {
      id, //ES1015 raccourci pour id: id
      label
    }
  }
}
```

*Plus d'inforamtion à propos de la [notation raccourcie]((/javascript/syntax.md#shorthand-property-names).*

Ainsi, notre action peut être créée de la manière suivante:

```javascript
const anAction = editCodeLabel('code_2', 'regular happy')
```

La fonction `editCodeLabel` s'appelle un [créateur d'actions](http://redux.js.org/docs/basics/Actions.html#action-creators).

## Utiliser le second argument de la fonction connect

On peut retravailler notre [exemple précédent](/react-redux/introduction-to-store.md) en passant un second argument  à la fonction `connect`:

```javascript

//On fait l'hypothèse que la fonction `editCodeLabel` importée ci-dessous a été
//définie dans le fichier `actions.js`
import { editCodeLabel } from './actions'

...

//Le composant recevra un paramètre supplémentaire: la fonction
//`editCodeLabel`. Cette fonction est différente de la fonction `editCodeLabel`
//qui a été importée. Il s'agit d'une nouvelle fonction produite par la fonction
//`connect`, à partir de la fonction `editCodeLabel` initiale.
function CodeListEditorDumb({ codes, editCodeLabel }) {
  return (
    ...
      {
        codes.map(({ id, label }, i) => 
          //On utilise la fonction `editCodeLabel` pour gérer chaque éditeur
          //(on utilise une fonction flêchée pour passer le bon identifant en
          //tant que premier argument).
          <CodeEditor 
            key={id} label={label}
            handleChange={val => editCodeLabel(id, val)} />)    
      }
    ...
  )
}

const mapStateToProps = ...

//Le second argument de `connect` est souvent appelé `mapDispatchToProps`. Dans
//sa version la plus simple, il s'agit d'un objet où chaque clé représente
//un créateur d'actions (une fonction qui retourne une action).
const mapDispatchToProps = {
  editCodeLabel: editCodeLabel //on pourrait utiliser le raccourci ES2015
}

export default 
  connect(mapStateToProps, mapDispatchToProps)(CodeListEditorDumb)
```

Lorsque la fonction `editCodeLabel` est appelée à partir du composant `CodeListEditor` (plus précisément, à partir d'un composant `CodeEditor`), la valeur retournée par la function `editCodeLabel` initiale sera envoyée directement au store: la fonction [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) a encapsulé le créateur d'actions pour envoyer directement l'action au store.

Afin de mieux cerner le fonctionnement de `connect`, on peut considérer que la fonction `editCodeLabel` initiale a été remplacée par la fonction suivante:

```javascript 
function editCodeLabelAfterConnect(id, value) {
  //the connect mechanism can access the store
  store.dispatch(editCodeLabel(id, value))
} 
```

Testez le code avec ce [pen](http://codepen.io/BoogalooJB/pen/ZLrYev). Nous remarquons que les codes ont été mis à jour et que l'interface a été actualisée.


<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="700"
  data-theme-id="dark"
  data-slug-hash="ZLrYev"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />
