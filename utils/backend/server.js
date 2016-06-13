var restify = require('restify')
var server = restify.createServer()
var fs = require('fs')

const  uuid = () => 
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36)

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
  headers: ['Access-Control-Allow-Origin', 'Location', 'authorization']
}))
server.use(restify.bodyParser())


//TODO `pogues-swagger.yaml` does not say exacty which type of object is 
//returned (it's not just an object with two keys `id` and `questionnaire`
//but an object where keys are ids and values are questionnaires).

/* API */
function shapeSpecs() {
  return {
    results: {
      bindings: Object.keys(repo.specs).reduce((bindings, specKey) => {
        const spec = repo.specs[specKey]

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
  res.send(JSON.stringify(shapeSpecs()))
  next()
})

server.get('/repo/clist/:retrievalQuery', function (req, res, next) {
  res.send(JSON.stringify(repo.cLists[req.params.retrievalQuery]))
  next()
})

server.post('/stromae/publisher', function (req, res, next) {
  const publishedQr = JSON.parse(req.body)
  const id = uuid()
  published[id] = publishedQr
  res.header('Location', 'http://localhost:4000/stromae/publisher/'
         + id)
  res.send()
  res.next()
})

server.get('/stromae/publisher/:id', function (req, res, next) {
  res.send(JSON.stringify(published[req.params.id]))
})


server.get('/questionnaires', function (req, res, next) {
  res.send(JSON.stringify(questionnaires))
  next()
})

server.get('/questionnaire/:id', function (req, res, next) {
  res.send(JSON.stringify(questionnaires[req.params.id]))
  next()
})

server.put('/questionnaire/:id', function (req, res, next) {
  questionnaires[req.params.id] = JSON.parse(req.body)
  save()
  res.send()
  next()
})

server.post('/questionnaire', function (req, res, next) {
  const id = uuid()
  const qr = JSON.parse(req.body)
  qr._id = id
  questionnaires[id] = qr
  save()
  res.header('Location', 'http://localhost:4000/questionnaire/' + id)
  res.send()
  next()
})

function save() {
  fs.writeFile(__dirname + '/questionnaires.json', JSON.stringify(questionnaires))
}

server.listen(4000)
