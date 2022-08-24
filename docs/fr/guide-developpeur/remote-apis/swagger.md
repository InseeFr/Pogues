# Documentation Swagger

La documentation swagger est générée par Springdoc automatiquement, vous pouvez la récupérer sur le endpoint `/rmes-pogbo/v3/api-docs`. Un exemple de la version 4.0.1 de Pogues-Back-Office est présenté ci-dessous :

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Pogues API",
    "description": "Rest Endpoints and services used by Pogues<h3>Pogues-Model version : 1.0.3</h3>",
    "version": "4.0.1"
  },
  "servers": [{ "url": "https://qfrmspogbolht01.ad.insee.intra/rmes-pogbo" }],
  "tags": [
    { "name": "Pogues Environment" },
    { "name": "Pogues MetaData API" },
    { "name": "Pogues Persistence" },
    { "name": "Pogues Search" },
    { "name": "Pogues Transforms" },
    { "name": "Health Check" },
    { "name": "Pogues Public Resources" }
  ],
  "paths": {
    "/api/persistence/questionnaire/{id}": {
      "get": {
        "tags": ["Pogues Persistence"],
        "summary": "Get questionnaire",
        "description": "Gets the questionnaire with id {id}",
        "operationId": "getQuestionnaires",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      },
      "put": {
        "tags": ["Pogues Persistence"],
        "summary": "Update questionnaire",
        "description": "Update a `Questionnaire` object with id {id}",
        "operationId": "updateQuestionnaire",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/JSONObject" }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      },
      "delete": {
        "tags": ["Pogues Persistence"],
        "summary": "Delete questionnaire",
        "description": "Delete questionnaire with id {id}",
        "operationId": "deleteQuestionnaire",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "204": {
            "description": "No content",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/persistence/questionnaire/json-lunatic/{id}": {
      "get": {
        "tags": ["Pogues Persistence"],
        "summary": "Get questionnaire",
        "description": "Gets the questionnaire with id JsonLunatic {id}",
        "operationId": "getJsonLunatic",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      },
      "put": {
        "tags": ["Pogues Persistence"],
        "summary": "Update Json Lunatic",
        "description": "Update Json Lunatic of a `Questionnaire` object with id {id}",
        "operationId": "updateJsonLunatic",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/JSONObject" }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      },
      "delete": {
        "tags": ["Pogues Persistence"],
        "summary": "Delete Json Lunatic of a questionnaire",
        "description": "Delete the Json Lunatic representation of a  questionnaire with id {id}",
        "operationId": "deleteJsonLunatic",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "204": {
            "description": "No content",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/xml2json": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get Pogues JSON From Pogues XML",
        "description": "Returns a JSON entity that must comply with Pogues data model based on XML",
        "operationId": "xml2Json",
        "requestBody": {
          "content": { "application/xml": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "500": {
            "description": "Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/xform2uri/{dataCollection}/{questionnaire}": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get Pogues visualization URI From Pogues XForm document",
        "description": "Returns the vizualisation URI of a form that was generated from XForm description found in body",
        "operationId": "xForm2URI",
        "parameters": [
          {
            "name": "dataCollection",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          },
          {
            "name": "questionnaire",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "500": {
            "description": "Error",
            "content": { "text/plain": { "schema": { "type": "string" } } }
          },
          "200": {
            "description": "OK",
            "content": { "text/plain": { "schema": { "type": "string" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/visualize/{dataCollection}/{questionnaire}": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization URI from JSON serialized Pogues entity",
        "description": "dataCollection MUST refer to the name attribute owned by the nested DataCollectionObject",
        "operationId": "visualizeFromBody",
        "parameters": [
          {
            "name": "dataCollection",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          },
          {
            "name": "questionnaire",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "description": "JSON representation of the Pogues Model",
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/visualize-stromae-v2/{questionnaire}": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization URI Stromae V2 from JSON serialized Pogues entity",
        "description": "Get visualization URI Stromae V2 from JSON serialized Pogues entity",
        "operationId": "visualizeStromaeV2FromBody",
        "parameters": [
          {
            "name": "questionnaire",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/visualize-queen/{questionnaire}": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization URI Queen from JSON serialized Pogues entity",
        "description": "Get visualization URI Queen from JSON serialized Pogues entity",
        "operationId": "visualizeQueenFromBody",
        "parameters": [
          {
            "name": "questionnaire",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/visualize-pdf": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization PDF questionnaire from JSON serialized Pogues entity",
        "operationId": "visualizePDFFromBody",
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/octet-stream": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/visualize-from-ddi/{dataCollection}/{questionnaire}": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization URI from DDI questionnaire",
        "description": "dataCollection MUST refer to the name attribute owned by the nested DataCollectionObject",
        "operationId": "visualizeFromDDIBody",
        "parameters": [
          {
            "name": "dataCollection",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          },
          {
            "name": "questionnaire",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/visualize-ddi": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization DDI file from JSON serialized Pogues entity",
        "operationId": "visualizeDDIFromBody",
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/octet-stream": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/json2xml": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get Pogues XML From Pogues JSON",
        "description": "Returns a serialized XML based on a JSON entity that must comply with Pogues data model",
        "operationId": "json2XML",
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "500": {
            "description": "Error",
            "content": {
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/StreamingResponseBody"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/fo2pdf": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization PDF questionnaire from FO questionnaire",
        "operationId": "fo2Pdf",
        "requestBody": {
          "content": { "application/xml": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/octet-stream": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/transform/ddi2pdf": {
      "post": {
        "tags": ["Pogues Transforms"],
        "summary": "Get visualization PDF questionnaire from DDI questionnaire",
        "operationId": "ddi2pdfWithParamTest",
        "parameters": [
          {
            "name": "columns",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["ONE", "TWO", "THREE", "FOUR"]
            }
          },
          {
            "name": "orientation",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["ZERO", "NINETY"]
            }
          },
          {
            "name": "capture",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["OPTICAL", "MANUAL"]
            }
          },
          {
            "name": "studyunit",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["DEFAULT", "BUSINESS", "HOUSEHOLD"]
            }
          },
          {
            "name": "timequestion",
            "in": "query",
            "required": true,
            "schema": { "type": "boolean" }
          }
        ],
        "requestBody": {
          "content": { "application/json": { "schema": { "type": "string" } } },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/octet-stream": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/search": {
      "post": {
        "tags": ["Pogues Search"],
        "summary": "Search Item",
        "description": "Search the application index for item across types`",
        "operationId": "search",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": true,
            "schema": { "$ref": "#/components/schemas/PoguesQuery" }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "subgroupId": {
                    "type": "string",
                    "description": "Search only items referring to sub-group id"
                  },
                  "studyUnitId": {
                    "type": "string",
                    "description": "Search only items referring to study-unit id"
                  },
                  "dataCollectionId": {
                    "type": "string",
                    "description": "Search only items referring to data-collection id"
                  },
                  "info": {
                    "type": "object",
                    "properties": {
                      "absolutePath": {
                        "type": "string",
                        "format": "uri"
                      },
                      "pathParameters": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "array",
                          "items": { "type": "string" }
                        }
                      },
                      "baseUri": {
                        "type": "string",
                        "format": "uri"
                      },
                      "requestUri": {
                        "type": "string",
                        "format": "uri"
                      },
                      "queryParameters": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "array",
                          "items": { "type": "string" }
                        }
                      },
                      "pathSegments": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "matrixParameters": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "array",
                                "items": { "type": "string" }
                              }
                            },
                            "path": { "type": "string" }
                          }
                        }
                      },
                      "requestUriBuilder": { "type": "object" },
                      "absolutePathBuilder": { "type": "object" },
                      "baseUriBuilder": { "type": "object" },
                      "matchedURIs": {
                        "type": "array",
                        "items": { "type": "string" }
                      },
                      "matchedResources": {
                        "type": "array",
                        "items": { "type": "object" }
                      },
                      "path": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "500": {
            "description": "Unexpected error",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/ResponseSearchItem" }
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/ResponseSearchItem" }
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/persistence/questionnaires": {
      "get": {
        "tags": ["Pogues Persistence"],
        "summary": "Get questionnaires",
        "description": "Gets the `QuestionnaireList` object",
        "operationId": "getQuestionnaireList",
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      },
      "post": {
        "tags": ["Pogues Persistence"],
        "summary": "Create Questionnaire",
        "description": "Creates a new `Questionnaire`",
        "operationId": "createQuestionnaire",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/JSONObject" }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "400": {
            "description": "Entity already exists",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/persistence/questionnaires/json-lunatic": {
      "post": {
        "tags": ["Pogues Persistence"],
        "summary": "Create Json Lunatic of questionnaire",
        "description": "Creates a new Json Lunatic entry",
        "operationId": "createJsonLunatic",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/JSONObject" }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "400": {
            "description": "Entity already exists",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/meta-data/items": {
      "post": {
        "tags": ["Pogues MetaData API"],
        "summary": "Get all de-referenced items",
        "description": "Maps a list of ColecticaItemRef given as a payload to a list of actual full ColecticaItem objects",
        "operationId": "getItems",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/ColecticaItemRefList" }
            }
          }
        },
        "responses": {
          "default": {
            "description": "default response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/ColecticaItem" }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/search/series": {
      "get": {
        "tags": ["Pogues Search"],
        "summary": "Import indexes from Colectica",
        "description": "This require a living instance of colectica aswell as a up and running elasticsearch cluster",
        "operationId": "getSubGroups",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/DDIItem" }
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/search/series/{id}/operations": {
      "get": {
        "tags": ["Pogues Search"],
        "summary": "Get all study-units (operations) for a given sub-group (series)",
        "description": "Retrieve all operations with a parent id matching the series id given as a path parameter",
        "operationId": "getStudyUnits",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/DDIItem" }
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/search/operations/{id}/collections": {
      "get": {
        "tags": ["Pogues Search"],
        "summary": "Get all data collections for a given operation",
        "description": "Retrieve all data collections with a parent id matching the operation id given as a path parameter",
        "operationId": "getDataCollections",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/DDIItem" }
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/search/context/collection/{id}": {
      "get": {
        "tags": ["Pogues Search"],
        "summary": "Get data collection context (Sub-group id, StudyUnit id) for a given data collection",
        "description": "Retrieve the context (Sub-group id, StudyUnit id) for a id given as a path parameter",
        "operationId": "getDataCollectionContext",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/DataCollectionContext"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/persistence/questionnaires/stamps": {
      "get": {
        "tags": ["Pogues Persistence"],
        "summary": "Get stamps in database",
        "description": "Get stamps with at least one questionnaire saved in database",
        "operationId": "searchQuestionnairesStamps",
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "401": {
            "description": "Unauthorized",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "400": {
            "description": "Bad request",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/persistence/questionnaires/search": {
      "get": {
        "tags": ["Pogues Persistence"],
        "summary": "Search questionnaires",
        "description": "Search questionnaires matching query params",
        "operationId": "searchQuestionnaires",
        "parameters": [
          {
            "name": "owner",
            "in": "query",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "400": {
            "description": "Bad request",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/persistence/questionnaires/search/meta": {
      "get": {
        "tags": ["Pogues Persistence"],
        "summary": "Get questionnaires' metadata",
        "description": "Get questionnaires' metadata matching query params",
        "operationId": "searchQuestionnairesMetadata",
        "parameters": [
          {
            "name": "owner",
            "in": "query",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "400": {
            "description": "Bad request",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/meta-data/units": {
      "get": {
        "tags": ["Pogues MetaData API"],
        "summary": "Get units measure",
        "description": "This will give a list of objects containing the uri and the label for all units",
        "operationId": "getUnits",
        "responses": {
          "default": {
            "description": "default response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Unit" }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/meta-data/item/{id}": {
      "get": {
        "tags": ["Pogues MetaData API"],
        "summary": "Gets the item with id {id}",
        "description": "Get an item from Colectica Repository, given it's {id}",
        "operationId": "getItem",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "default": {
            "description": "default response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/ColecticaItem" }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/meta-data/item/{id}/refs/": {
      "get": {
        "tags": ["Pogues MetaData API"],
        "summary": "Get the children refs with parent id {id}",
        "description": "This will give a list of object containing a reference id, version and agency. Note that you willneed to map response objects keys to be able to use it for querying items (see /items doc model)",
        "operationId": "getChildrenRef",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "default": {
            "description": "default response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ColecticaItemRefList"
                }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/meta-data/item/{id}/ddi": {
      "get": {
        "tags": ["Pogues MetaData API"],
        "summary": "Get DDI document",
        "description": "Gets a full DDI document from Colectica repository reference {id}",
        "operationId": "getFullDDI",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/api/init": {
      "get": {
        "tags": ["Pogues Public Resources"],
        "summary": "Initial properties",
        "operationId": "getInit",
        "responses": {
          "200": {
            "description": "OK",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        }
      }
    },
    "/api/healthcheck": {
      "get": {
        "tags": ["Health Check"],
        "summary": "Perform HealthCheck on Pogues environment",
        "description": "This method will return the status of applications needed for Pogues",
        "operationId": "getHealthcheck",
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "500": {
            "description": "Internal Server Error",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "209": {
            "description": "Warning",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        }
      }
    },
    "/api/env": {
      "get": {
        "tags": ["Pogues Environment"],
        "summary": "Get pogues back office environment",
        "operationId": "getEnvironment",
        "responses": {
          "200": {
            "description": "Success",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "401": {
            "description": "Unauthorized",
            "content": { "*/*": { "schema": { "type": "object" } } }
          },
          "404": {
            "description": "Not found",
            "content": { "*/*": { "schema": { "type": "object" } } }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    }
  },
  "components": {
    "schemas": {
      "JSONObject": {
        "type": "object",
        "properties": { "empty": { "type": "boolean" } },
        "additionalProperties": { "type": "object" }
      },
      "StreamingResponseBody": { "type": "object" },
      "PoguesQuery": {
        "type": "object",
        "properties": {
          "types": {
            "type": "array",
            "items": { "type": "string" }
          },
          "filter": { "type": "string" }
        }
      },
      "ResponseSearchItem": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "title": { "type": "string" },
          "version": { "type": "string" },
          "subgroupId": { "type": "string" },
          "studyUnitId": { "type": "string" },
          "dataCollectionId": { "type": "string" },
          "type": { "type": "string" }
        }
      },
      "ColecticaItem": {
        "type": "object",
        "properties": {
          "published": { "type": "boolean" },
          "provisional": { "type": "boolean" },
          "deprecated": { "type": "boolean" },
          "ItemType": { "type": "string" },
          "AgencyId": { "type": "string" },
          "Version": { "type": "string" },
          "Identifier": { "type": "string" },
          "Item": { "type": "string" },
          "VersionDate": { "type": "string" },
          "VersionResponsibility": { "type": "string" },
          "IsPublished": { "type": "boolean" },
          "IsDeprecated": { "type": "boolean" },
          "IsProvisional": { "type": "boolean" },
          "ItemFormat": { "type": "string" },
          "VersionRationale": {
            "type": "object",
            "properties": { "empty": { "type": "boolean" } },
            "additionalProperties": { "type": "object" }
          },
          "Notes": {
            "type": "array",
            "properties": { "empty": { "type": "boolean" } },
            "items": { "type": "object" }
          }
        }
      },
      "ColecticaItemRef": {
        "type": "object",
        "properties": {
          "Identifier": { "type": "string" },
          "Version": {
            "type": "integer",
            "format": "int32"
          },
          "AgencyId": { "type": "string" }
        }
      },
      "ColecticaItemRefList": {
        "type": "object",
        "properties": {
          "Identifiers": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/ColecticaItemRef" }
          }
        }
      },
      "DDIItem": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "label": { "type": "string" },
          "parent": { "type": "string" },
          "groupId": { "type": "string" },
          "subGroupId": { "type": "string" },
          "studyUnitId": { "type": "string" },
          "dataCollectionId": { "type": "string" },
          "resourcePackageId": { "type": "string" },
          "type": { "type": "string" }
        }
      },
      "DataCollectionContext": {
        "type": "object",
        "properties": {
          "dataCollectionId": { "type": "string" },
          "serieId": { "type": "string" },
          "operationId": { "type": "string" }
        }
      },
      "Unit": {
        "type": "object",
        "properties": {
          "uri": { "type": "string" },
          "label": { "type": "string" }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}
```
