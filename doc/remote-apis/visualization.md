# Visualize questionnaires

This service takes a questionnaire description and returns an URL to visualize the questionnaire.

## Configuration

URL and path for this service are configured in [src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js), with `baseURL` and `stromaePath` entries. 

## Serialization

The questionnaires are serialized in `json` and comply to the [schema](/doc/remote-apis/schema.md). Read more about [json representation of questionnaires]((/doc/remote-apis/questionnaire-json.md).