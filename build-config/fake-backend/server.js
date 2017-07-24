var restify = require('restify')
var server = restify.createServer()
var listenPort = process.env.PORT || 5000

var questionnaires = require(__dirname + '/questionnaires')

restify.CORS.ALLOW_HEADERS.push('authorization')
restify.CORS.ALLOW_HEADERS.push('Location')

server.use(restify.CORS({
  headers: ['Location'],
  credentials: true,
}))

server.use(restify.bodyParser())

server.get('/questionnaires/search', function (req, res, next) {
  // @TODO: Take into account the property "owner"
  res.send(questionnaires)
  next()
})

server.get('/user/attributes', function (req, res, next) {
  res.send({
    id: 'FAKEID',
    name: 'Fake user',
    permission: 'FAKEPERMISSION',
  })
  next()
})

server.get('/questionnaire/:id', function (req, res, next) {
  var position = getQuestionnairePosition(questionnaires, req.params.id)
  var questionnaire = position !== -1 ? questionnaires[position] : {}
  res.send(questionnaire)
  next()
})

server.put('/questionnaire/:id', function (req, res, next) {
  var qr = req.body
  var position = getQuestionnairePosition(questionnaires, req.params.id)
  if(position > -1) {
    questionnaires.splice(position, 1)
  }

  questionnaires.push(qr);
  res.send()
  next()
})

server.post('/questionnaires', function (req, res, next) {
  var qr = req.body
  questionnaires.push(qr)
  res.header('Location', 'http://' + req.headers.host + '/questionnaires/' + qr.id)
  res.send()
  next()
})

function getQuestionnairePosition(questionnaires, id) {
  for(var i=0; i<questionnaires.length; i++) {
    if(questionnaires[i].id === id) {
      return i
    }
  }

  return -1
}

console.log('listening in http://localhost:' + listenPort)

server.listen(listenPort)
