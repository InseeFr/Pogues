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

// var published = JSON.parse(
//     fs.readFileSync(__dirname + '/published.json', 'utf8'))
var published = {}

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
  var questionnaireList = Object.keys(questionnaires).reduce(function(_qL, id) {
    var qr = questionnaires[id]
    _qL[id] = {
      _id: qr._id,
      _name: qr._name,
      _label: qr._label[0],
      _agency: qr._agency,
      _survey: qr._survey
    }
    return _qL
  }, {})
  res.send(questionnaireList)
  next()
})

server.del('/questionnaire/:id', function (req, res, next) {
  delete questionnaires[req.params.id]
  res.send(204)
  next()
})

server.get('/questionnaire/:id', function (req, res, next) {
  res.send(questionnaires[req.params.id])
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
  qr._id = id
  questionnaires[id] = qr
  save()
  res.header('Location', 'http://' + req.headers.host + '/questionnaires/' + id)
  res.send()
  next()
})

function save() {
  fs.writeFile(__dirname + '/questionnaires.json', JSON.stringify(questionnaires))
}

console.log('listening in http://localhost:' + listenPort)

server.listen(listenPort)
