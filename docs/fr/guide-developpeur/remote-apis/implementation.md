# Implémentation

Les requêtes sont déclenchées par les composants React qui requièrent des ressources distantes. Ces composants utilisent les fonctions du type `loadSomethingIfNeeded` au sein de hooks useEffect() React. Par exemple, le composant `PageQuestionnaire` appelle `loadCampaignsIfNeeded` lorsqu'il est [instancié](https://github.com/InseeFr/Pogues/blob/main/src/layout/page-questionnaire/components/page-questionnaire.jsx). Ce chapitre décrit comment ce processus fonctionne.

## Appels distants

Les appels sont définis dans le fichier [src/utils/remote-api.js](https://github.com/InseeFr/Pogues/blob/main/src/utils/remote-api.js). Ils s'appuient sur l'[API fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Un polyfill est utilisé pour les navigateurs qui ne supportent pas cette API, grâce à [babel-polyfill](https://github.com/InseeFr/Pogues/blob/d28a7f67894479807f6b3d1c45b1b24883a556c4/src/js/main.js#L11).

Exemple:

```javascript
/**
 * Récupérer un questionnaire
 * chemin du type '/pogues/questionnaire/{id}'
 */
export const getQuestionnaire = async (id, token) => {
  const b = await getBaseURI();
  return fetch(`${b}/${pathQuestionnaire}/${id}`, {
    headers: getHeaders({ Accept: 'application/json' }, token),
  }).then(res => res.json());
};
```

Ce module exporte des fonctions qui retournent une [Promesse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Si la requête est réussie, la Promesse sera tenue avec comme valeur:

- les données brutes attendues (`res.JSON()`) pour les requêtes de type `GET`;
- la réponse HTTP brute s'il n'y a pas de donnée à extraire de la réponse;
- la valeur d'un champ des headers si opportun.

Ce fichier comporte les appels pour les 3 services utilisés par Pogues:

- [visualisation](./visualization.md) (`visualizeDDI`,`visualizePdf`,...);
- [persistance](./persistence.md) (`getQuestionnaire`, `putQuestionnaire`, `getQuestionnaireList`...);

## Créateurs d'actions

Pour déclencher un appel distant, nous utilisons les créateurs d'actions avec le [middleware Redux Thunk](https://github.com/gaearon/redux-thunk). On applique le shéma pour les [appels asynchrones](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators) décrits dans la documentation de Redux.

Grâce à Redux Thunk, les créateurs d'actions peuvent retourner une fonction au lieu d'un objet `JavaScript`. Ainsi, on peut écrire des actions asyncrhones avec une fonction qui:

- envoie immédiatement au store une action sous la forme d'un objet `JavaScript`, pour indiquer que la requête a bien été enregistrée; le type d'action prend la forme `LOAD_SOMETHING`;
- envoie la requête (grâce aux [utilitaires](https://github.com/InseeFr/Pogues/blob/main/src/utils/remote-api.js) mentionnés plus haut, par exemple la fonction `getQuestionnaire`);
- envoie au store de façon différée une action de la forme `LOAD_SOMTHING_SUCCESS` si la Promesse renvoyée par fetch a été résolue (le gestionnaire `then` défini dans la Promesse), ou une action de la forme `LOAD_QUESTIONNAIRE_FAILURE` si elle échoue (gestionnaire `catch`);
- retourne la Promesse pour d'éventuelles valorisations ultérieures.

Exemple à partir du fichier [src/actions/questionnaire.js](https://github.com/InseeFr/Pogues/blob/main/src/actions/questionnaire.js) (dans le code initial, nous utilisons des fonctions flêchées à la place des fonctions classiques):

```javascript
import { getQuestionnaire } from '(...)/remote-api';

export const loadQuestionnaire = (id, token) => dispatch => {
  dispatch(loadQuestionnaireStart());
  dispatch({
    type: LOAD_QUESTIONNAIRE,
    payload: id,
  });
  return getQuestionnaire(id, token)
    .then(qr => {
      dispatch(loadQuestionnaireSuccess(questionnaireRemoteToStores(qr)));
    })
    .catch(err => {
      dispatch(loadQuestionnaireFailure(id, err));
    });
};

export const loadQuestionnaireStart = () => ({
  type: LOAD_QUESTIONNAIRE_START,
  payload: {},
});

export const loadQuestionnaireSuccess = update => ({
  type: LOAD_QUESTIONNAIRE_SUCCESS,
  payload: {
    update,
  },
});

export const loadQuestionnaireFailure = (id, err) => ({
  type: LOAD_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});
```

Remarque: on devrait vraisemblablement éviter l'usage de `catch` ici (cf. [#146](https://github.com/InseeFr/Pogues/issues/146))

TODO screenshot devtools

## Ne pas récupérer deux fois la même ressource

Nous utilisons également Redux Thunk pour définir des créateurs d'actions qui veilleront à ne pas effectuer un appel distant pour ressource qui aurait déjà été récupérée, et qui serait donc disponible localement dans l'état de l'application.

```javascript
export const loadUnitsIfNeeded = token => (dispatch, getState) => {
  const state = getState();
  const { units } = state.metadataByType;
  if (!units) dispatch(loadUnits(token));
};
```

Les créateurs d'actions du type `loadSomethingIfNeeded` sont appelés à partir des hooks `useEffect()` des composants React qui ont besoin de la ressource `Something`.

Exemple issu du fichier [src/layout/page-questionnaire/components/page-questionnaire.jsx](https://github.com/InseeFr/Pogues/blob/main/src/layout/page-questionnaire/components/page-questionnaire.jsx):

```javascript
const PageQuestionnaire = props => {

  ...

  useEffect(() => {
    if (
      activeQuestionnaire &&
      !isEqual(activeQuestionnaire, activeQuestionnaireState)
    ) {
      if (activeQuestionnaire.campaigns) {
        const idCampaign =
          activeQuestionnaire.campaigns[
            activeQuestionnaire.campaigns.length - 1
          ];
        loadStatisticalContext(idCampaign, token);
      }
      if (activeQuestionnaire.operation) {
        loadCampaignsIfNeeded(activeQuestionnaire.operation, token);
      }
      setActiveQuestionnaireState(activeQuestionnaire);
    }
  }, [
    token,
    activeQuestionnaire,
    activeQuestionnaireState,
    loadStatisticalContext,
    loadCampaignsIfNeeded,
  ]);

  ...

}
```
