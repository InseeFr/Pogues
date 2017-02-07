# Loading a questionnaire

This section illustrates how the data flows within Pogues. For this, it looks at what happens when a user selects a questionnaire.

![A user selects a questionnaire](/img/select-questionnaire.png "A user selects a questionnaire")

When a user selects a questionnaire from the questionnaire list, there are many elementary steps to process, from sending the request to updating the UI. Here is a global picture:

1. The application shows the `QuestionnairePicker` component.
2. The user selects a questionnaire in the questionnaire list.
3. The `switchQuestionnaire` action [creator](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/components/questionnaire-list.js#L34)  is called.
4. The `SWITCH_TO_QUESTIONNAIRE` [action](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/app-state.js#L7) is dispatched. It contains the questionnaire id in its payload.
5. The [switchToQuestionnaire](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/reducers/app-state/index.js#L111) handler from the `appState` reducer updates the `view` entry and set it to `QUESTIONNAIRE`.
6. The application re-renders.
7. When rendering the main `PoguesApp` component, the `view` entry is checked, and the `QuestionnaireContainer` component is [rendered](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/components/pogues-app.js#L27-L30), in place of the previous `QuestionnairePicker` component.
8. In its `componentWillMount` method, the [loadQuestionnaireIfNeeded](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L94) function is [called](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/components/pogues-app.js#L27-L30). It takes the questionnaire id as an argument.
9. Assuming the questionnaire has not been already loaded, the `loadQuestionnaire` action creator is [called](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L98).
10. The component renders a [spinner](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/components/questionnaire-container.js#L48) to indicate that the questionnaire is loading.
11. The `LOAD_QUESTIONNAIRE` action will be [dispatched](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L103), with the questionnaire id in its payload.
12. The [getQuestionnaire](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/utils/remote-api.js#L118) function is called. The browser tries to fetch the given resource and returns a Promise.
. The fetch call succeeds and the Promise resolves to a `json` representation of the questionnaire.
13. The `then` [handler](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/actions/questionnaire.js#L101) in the action creators file is executed.
14. It calls the [toSate](https://github.com/InseeFr/Pogues/blob/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/src/js/utils/model-to-state-questionnaire.js#L17) function and dispatches the `LOAD_QUESTIONNAIRE_SUCCESS` action with the result of this function in its payload.
15. The `LOAD_QUESTIONNAIRE_SUCCESS` is processed by many reducers to update the application state: to add an entry in the `questionnaires-by-id` reducer, to add multiple entries in the `components-by-id` reducer (one for each sequence and each question in the questionnaire), to add multiple entries in the `code-by-id` reducer (one for each code in every code list in the questionnaire)...
16. The application re renders. The questionnaire content is now visible.

![The questionnaire is shown](/img/questionnaire.png "The questionnaire is shown")