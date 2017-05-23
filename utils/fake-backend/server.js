var restify = require('restify')
var server = restify.createServer()
var fs = require('fs')
var listenPort = process.env.PORT || 4000

var uuid = function() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
}

var questionnaires = JSON.parse(
    fs.readFileSync(__dirname + '/questionnaires.json', 'utf8'))

var repo = JSON.parse(
    fs.readFileSync(__dirname + '/repo.json', 'utf8'))

var published = {}

var questionnairesDetail = {}

Object.keys(questionnaires).forEach(function(qId) {
  var questionnaireDetailPath = __dirname + '/questionnaire-' + qId + '.json'
  if(fs.existsSync(questionnaireDetailPath)) {
    questionnairesDetail[qId] = JSON.parse(
      fs.readFileSync(questionnaireDetailPath, 'utf8'))
  }
});

// allow  cross origin request
/*
MLHttpRequest cannot load http://localhost:4000/questionnaires.
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://localhost:8080' is therefore not allowed access.
*/
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('Location');
server.use(restify.CORS({
  headers: ['Location']
}))
server.use(restify.bodyParser())


//TODO `pogues-swagger.yaml` does not say exacty which type of object is
//returned (it's not just an object with two keys `id` and `questionnaire`
//but an object where keys are ids and values are questionnaires).

/* API */
function shapeSpecs() {
  return {
    results: {
      bindings: Object.keys(repo.specs).reduce(function(bindings, specKey) {
        var spec = repo.specs[specKey]

        bindings.push({
          niveau: {
            value: spec.id
          },
          retrievalQuery: {
            value: spec.retrievalQuery
          },
          label: {
            value: spec.label
          }
        })
        return bindings
        }, [])
    }
  }
}

server.get('/repo/specs', function (req, res, next) {
  res.send(shapeSpecs())
  next()
})

server.get('/repo/clist/:retrievalQuery', function (req, res, next) {
  res.send(repo.cLists[req.params.retrievalQuery])
  next()
})

server.post('/stromae/publisher', function (req, res, next) {
  var publishedQr = JSON.parse(req.body)
  var id = uuid()

  published[id] = publishedQr
  res.header('Location', 'http://' + req.headers.host + '/stromae/publisher/'
         + id)
  res.send()
  next()
})

server.get('/stromae/publisher/:id', function (req, res, next) {
  res.send(published[req.params.id])
  next()
})


server.get('/questionnaires', function (req, res, next) {
  res.send(questionnaires)
  next()
})

server.del('/questionnaire/:id', function (req, res, next) {
  delete questionnaires[req.params.id]
  res.send(204)
  next()
})

server.get('/questionnaire/:id', function (req, res, next) {
  res.send(questionnairesDetail[req.params.id])
  next()
})

server.put('/questionnaire/:id', function (req, res, next) {
  questionnaires[req.params.id] = JSON.parse(req.body)
  save()
  res.send()
  next()
})

server.post('/questionnaires', function (req, res, next) {
  var id = uuid()
  var qr = JSON.parse(req.body)
  var response = {
    validation: {
      _error: []
    }
  }
  var statusCode

  // Example of the server validation

  // Validate name and label are not empty
  // @TODO: Validate the rest of restrictions
  if(qr.name === '') response.validation['name'] = 'Required'
  if(qr.label === '') response.validation['label'] = 'Required'

  // Validate that the questionnaire name doesn't exist already
  var nameExist = Object.keys(questionnaires).filter(function(qId){
    return questionnaires[qId].name === qr.name
  }).length > 0

  if(nameExist) response.validation._error.push('There is a questionnaire with the same name')

  if(Object.keys(response.validation).length > 1 || response.validation._error.length > 0) {
    statusCode = 400;
  } else {
    statusCode = 200;
    questionnaires[id] = qr
    save()
  }

  // @TODO: Confirm that the real server return the id in a header attributte
  res.header('Location', 'http://' + req.headers.host + '/questionnaires/' + id)
  res.send(statusCode, response)
  next()
})

function save() {
  fs.writeFile(__dirname + '/questionnaires.json', JSON.stringify(questionnaires))
}

console.log('listening in http://localhost:' + listenPort)

server.listen(listenPort)
