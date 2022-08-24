# Charger un questionnaire

Cette section illustre la manière dont l'information circule au sein de l'application. Pour cela, elle présente en détail ce qu'il se passe lorsqu'un utilisateur sélectionne un questionnaire.

![Un utilisateur sélectionne un questionnaire](../../../img/select-questionnaire.png 'Un utilisateur sélectionne un questionnaire')

Lorsqu'un utilisateur sélectionne un questionnaire au sein de la liste des questionnaires, le processus est composé de nombreuses étapes élémentaires, qui vont de l'envoi de la requête au service Web dédié à l'actualisation de l'interface. Globalement:

1. L'application affiche le composant `QuestionnaireList`.
2. L'utilisateur sélectionne un questionnaire dans la liste.
3. La librairie de routage envoie l'utilisateur sur la page de modification de questionnaire
4. Le hook d'effet du composant page-questionnaire.jsx se déclenche
5. Le [créateur d'actions](https://github.com/InseeFr/Pogues/blob/main/src/actions/questionnaire.js) `loadQuestionnaire` est appelé.
6. L'action `LOAD_QUESTIONNAIRE_START` est envoyée.
7. La fonction `loadQuestionnaireStart` du reducer `questionnaire-by-id.js` met à jour la propriété loader avec la valeur `true`.
8. Un spinner s'affiche à l'écran pour indiquer le chargement des données du questionnaire.
9. L'action `LOAD_QUESTIONNAIRE` est envoyée. Elle contient l'identifiant du questionnaire dans le payload.
10. La fonction [getQuestionnaire](https://github.com/InseeFr/Pogues/blob/main/src/utils/remote-api.js#L232) est appelée. Le navigateur lance la requête et retourne une Promesse.
11. La requête est réussie et la Promesse renvoie une représentation en `JSON` du questionnaire.
12. [La suite de la promesse](https://github.com/InseeFr/Pogues/blob/main/src/actions/questionnaire.js#L88) définie par le créateur d'actions est exécutée.
13. Elle appelle la fonction [questionnaireRemoteToStores ](https://github.com/InseeFr/Pogues/blob/main/src/model/remote-to-stores.js) et envoie l'action `LOAD_QUESTIONNAIRE_SUCCESS` accompagnée du résultat retourné par cette fonction.
14. L'action `LOAD_QUESTIONNAIRE_SUCCESS` est traitée par de nombreux reducers pour mettre à jour l'état du questionnaire au moment du chargement : par exemple les entrées `questionnaireById`, `componentsByQuestionnaire`, `codeListByQuestionnaire`, etc...
15. Lorsque le store est mis à jour le hook d'effet de page-questionnaire.jsx est relancé et les créateurs d'action de la forme `setActiveSomething` sont appelés. Ces actions sont interceptées par le reducer combiné [app-state.js](https://github.com/InseeFr/Pogues/blob/main/src/reducers/app-state/app-state.js). L'état courant du questionnaire est mise à jour dans l'entrée `appState` du store.
16. L'interface est actualisée. Le contenu du questionnaire est désormais visible.

![Le questionnaire est affiché](../../../img/questionnaire.png 'Le questionnaire est affiché')
