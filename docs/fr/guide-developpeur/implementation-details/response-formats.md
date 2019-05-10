# Format des réponses

La sérialisation et désérialisation des formats de réponse n'est pas triviale: la traduction du modèle de données Pogues vers les concepts présentés dans l'interface utilisateur n'est pas immédiate. Ainsi, le code source a été divisé en plusieurs fichiers, un pour chaque type d'opération (sérialisation et désérialisation): le code se trouve dans le dossier [src/js/utils/response-format](https://github.com/InseeFr/Pogues/tree/master/src/js/utils/response-format) et est appelé par [src/js/model-to-state-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/model-to-state-questionnaire.js) (désérialisation) et [state-to-model-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/state-to-model-questionnaire.js) (sérialiastion).

Plus d'information à propos du [modèle de données](/remote-apis/schema.md).

L'information relative aux formats de réponse est gérée par le reducer `response-format-by-id`. Lorsque l'utilisateur modifie le format de réponse, on conserve l'information asssociée au format de réponse précédent, ce qui permet de restituer cette information si l'utlisateur revient au final sur l'option précédente.