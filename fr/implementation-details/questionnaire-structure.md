# Manipuler la structure du questionnaire

Manipuler la structure du questionnaire n'est pas trivial: ce processus doit respecter des règles de gestion complexes. Ces règles sont parfois plus faciles à décrire en travaillant à partir d'une représentation "à plat" du questionnaire (un tableau où chaque question ou séquence apparaît dans l'ordre chronologique), à la place d'une structure arborescente à plusieurs niveaux. Par exemple:
- pour réaliser des [contrôles à la volée](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/components/goto-panel.js#L89) et les [contrôles d'intégrité](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/goTosChecker.js) sur les `goTo`s;
- lorsque l'on modifie la structure du questionnaire ([suppression d'un composant](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/components/delete-activator.js), [glisser-déposer](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/components/question-or-sequence.js#L36));
- pour [attacher les sauts de page](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/page-break-by-id.js#L32-L45) au bon composant lorsque la structure du questionnaire change.

## Exemple - Déplacer un composant

Cette représentation à plat du questionnaire est utilisée lorsque l'on déplace une question ou une séquence (par le composant `QuestionOrSequence`), pour [déterminer](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/components/question-or-sequence.js#L40-L42) quelle était la question ou la séquence avant celle qui vient d'être déplacée. Cette information est requise par le créateur d'actions [moveComponent](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/actions/component.js#L49-L57):

```javascript
export const moveComponent = (qrId, origin, dest, previous) => ({
  type: MOVE_COMPONENT,
  payload: {
    origin,
    dest,
    //On doit connaître le composant qui précède celui qui est déplacé.
    //Cela n'est pas trivial. Cela peut être par exemple le dernier composant
    //de la séquence qui précède.
    previous,
    qrId
  }
})
```

Pour cela, la représentation à plat du questionnaire est [passée en paramètre](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/components/question-or-sequence.js#L131) au composant `QuestionOrSequence`.

## Mettre à plat le questionnaire

La function [flatten](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/data-utils.js#L31) est utilisée pour construire cette représentation à plat et chronologique du questionnaire.

À l'avenir, cette information pourraît être intégrée à l'état de l'application: cette représentation du questionnaire est utile et plus adaptée pour de nombreuses opérations. Mais pour l'instant, elle est calculée par les composants qui en ont besoin. Nous utilisons une simple technique de [memoization](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/data-utils.js#L80-L85) pour éviter d'avoir à recalculer plusieurs fois cette information si la structure du questionnaire n'a pas changé.

## Utilitaires

Des [utilitaires](https://github.com/InseeFr/Pogues/tree/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/tree-utils) utlisent la fonction `flatten` pour ajouter, déplacer ou supprimer une question ou une séquence.
