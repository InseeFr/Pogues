# Swagger documentation

Here is the online version of the [swagger documentation](https://github.com/InseeFr/Pogues/blob/master/doc/pogues-swagger.yaml) for the two coexisting services for questionnaires persistance and visualisation.

```yaml
swagger: '2.0'

# This is your document metadata
info:
  version: "0.1.0"
  title: Pogues-Stromae interface
  description: Description of the API used by the Pogues client to access Stromae services
basePath: /exist

schemes:
 - http
consumes:
  - application/JSON
produces:
  - application/JSON
paths:
  /pogues/questionnaires:
  
    get:
      description: Gets the `QuestionnaireList` object.
      responses:
        # Response code
        200:
          description: Successful response
          schema:
            $ref: '#/definitions/QuestionnaireList'
        404:
          description: List not found
  
    post:
      description:
        Creates a new `Questionnaire`.
      parameters:
        - name: questionnaire
          in: body
          description: The new questionnaire to create
          required: true
          schema:
            $ref: '#/definitions/Questionnaire'
      responses:
        201:
          description: The questionnaire was created
          headers:
            Location:
              description: The URI of the new questionnaire
              type: string
            Slug:
              description: The id of the questionnaire that was submitted
              type: string
        400:
          description: Malformed object in the query
        401:
          description: The client is not authorized for this operation

    put:
      description:
        Creates or replaces the `QuestionnaireList` object.
      parameters:
        - name: list
          in: body
          description: List of questionnaires to save
          required: true
          schema:
            $ref: '#/definitions/QuestionnaireList'
      responses:
        201:
          description: The questionnaire list was created or updated
        400:
          description: Malformed object in the query
        401:
          description: The client is not authorized for this operation

  /pogues/questionnaire/{id}:
  
    get:
      description: Gets the questionnaire with id {id}
      parameters:
        - name: id
          in: path
          description: The identifier of the questionnaire to retrieve
          type: string
      responses:
        # Response code
        200:
          description: Successful response
          schema:
            $ref: '#/definitions/Questionnaire'
        404:
          description: Questionnaire not found

    put:
      description:
        Creates or replaces a `Questionnaire` object.
      parameters:
        - name: id
          in: path
          description: The identifier of the questionnaire to create or save
          type: string
        - name: questionnaire
          in: body
          description: The questionnaire to save
          required: true
          schema:
            $ref: '#/definitions/Questionnaire'
      responses:
        201:
          description: The questionnaire was created or updated
        400:
          description: Malformed object in the query
        401:
          description: The client is not authorized for this operation

  /stromae/publisher:
    post:
      description:
        Publishes a `Questionnaire` as a web resource.
      parameters:
        - name: questionnaire
          in: body
          description: The questionnaire to publish
          required: true
          schema:
            $ref: '#/definitions/Questionnaire'
      responses:
        202:
          description: The questionnaire will be published
          headers:
            Location:
              description: The URI where the questionnaire will be published
              type: string
        303:
          description: The questionnaire was published
          headers:
            Location:
              description: The URI of the published questionnaire
              type: string
        400:
          description: Malformed object in the query
        401:
          description: The client is not authorized for this operation

definitions:
  QuestionnaireList:
    description: A list of questionnaires
    type: object
    properties:
      id:
        type: string
      questionnaire:
        $ref: '#/definitions/Questionnaire'
  Questionnaire:
    description: A questionnaire
    type: object
    properties:
      id:
        type: string
      name:
        type: string
      label:
        type: string
      agency:
        type: string
      survey:
        $ref: '#/definitions/Survey'
  Survey:
    description: A survey associated to the questionnaire
    type: object
    properties:
      id:
        type: string
      name:
        type: string
      agency:
        type: string
```