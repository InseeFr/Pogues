# Store and retrieve questionnaires

URL and path for this service are configured in [src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js), with `baseURL` and `poguesPath` entries. 

## Serialization

For now, representation of questionnaires within this web service is slightly different from the formal description provided by [pogues model](./schema.md). This representation is closer from the inner requirements of Pogues but can easily translate to and from this formal representation. 

In a near future, questionnaires should be serialized the same way for persistence and serialization.

