# Un composant avec Redux

Avant d'étudier plus en détail Redux, regardons à quoi ressemblera le code pour le composant `CodeListEditor` lorsque nous utiliserons Redux pour gérer l'état de l'application:

```javascript
function CodeListEditor({ codes, addCode, editCodeLabel }) {
  return (
    <ul>
      { 
        codes.map(( {id, label }) => 
          <li key={code}>
            <CodeEditor
              id={id}
              label={label}
              handleChange={val => editCodeLabel(id, val)}
               />
          </li>
        )
      }
    </ul>
  )
}
```

Le composant `CodeEditor` n'est pas modifié (il s'agissait déjà d'un composant sans état).

On remarque que le composant `CodeListEditor`:
- est désormais un composant sans état représenté par une fonction;
- doit recevoir des paramètres: les codes constituant la liste de codes, une fonction pour ajouter un code et une fonction pour mettre à jour un code (pour aller au bout de la démarche, il faudrait également lui passer des fonctions permmetant de supprimer un code ou de le déplacer).

Dans les chapitres suivants, nous verrons:
- comment modéliser l'état de l'application;
- comment utiliser au sein d'un composant de l'information issue de l'état de l'application;
- comment actualiser l'état de l'application quand un changement a lieu.