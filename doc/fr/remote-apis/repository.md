# Retrieve code list and code list specifications

For now, this service only provides some minimal functionalities to retrieve some code list specifications.

## Configuration

It relies on the `makeRepoURLSpecs` function from the [src/js/utils/data-json-utils.js](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/data-json-utils.js) to build the URL for the requests.

## Json representation

The results for `GET repo/specs` to retrieve a list of code list specifications are raw `sparql` results which look like this:

```json
{
  "results": {
    "bindings": [
      {
        "niveau": {
          "value": "cl_malefemale"
        },
        "retrievalQuery": {
          "value": "getMaleFemale"
        },
        "label": {
          "value": "Woman or man"
        }
      },
      {
        "niveau": {
          "value": "cl_yesno"
        },
        "retrievalQuery": {
          "value": "getYesNo"
        },
        "label": {
          "value": "yes or no"
        }
      }
      ...
    ]
  }
}
```

The results for request like `GET repo/clist/getMaleFemale` to retrieve the codes from a query look like this:

```json
{
  "id": "cl_gender",
  "name": "cl_gender",
  "label": "Gender",
  "codes": [
    {
      "value": 0,
      "label": "Male"
    },
    {
      "value": 1,
      "label": "Female"
    }
  ]
}
```