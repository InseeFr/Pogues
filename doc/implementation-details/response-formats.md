# Response formats

The parsing/serialising process of response format is not trivial: the translation between Pogues model (the xml schema) and the user interface concepts is not straightforward. Hence, the source code has been divided into multiple files for each operation, parsing and serialising: it stays in the [src/js/utils/response-format](https://github.com/InseeFr/Pogues/tree/master/src/js/utils/response-format) directory and is called by [src/js/model-to-state-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/model-to-state-questionnaire.js)(parsing) and [state-to-model-questionnaire.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/state-to-model-questionnaire.js) (serializing).

Related information about the model can be found [here](/doc/remote-apis/schema.md).

Response format information is handled by the `response-format-by-id` reducer. We don't drop information when the user chooses a format instead of another. We just tag the current format to valued the right description, but keeping the old data in memory allows to switch back to the previous format with no lost of information.