var restify = require('restify')
var server = restify.createServer()
var listenPort = process.env.PORT || 5000

var questionnaires = require(__dirname + '/questionnaires')
var series = require(__dirname + '/series')
var operations = require(__dirname + '/operations')
var campaigns = require(__dirname + '/campaigns')
var questionnairesRefInfos = require(__dirname + '/questionnaires-ref-infos')

restify.CORS.ALLOW_HEADERS.push('authorization')
restify.CORS.ALLOW_HEADERS.push('Location')

function getQuestionnairePosition(questionnaires, id) {
  for(var i=0; i<questionnaires.length; i++) {
    if(questionnaires[i].id === id) {
      return i
    }
  }

  return -1
}

server.use(restify.CORS({
  headers: ['Location'],
  credentials: true,
}))

server.use(restify.bodyParser())
server.use(restify.queryParser())

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

  questionnaires.push(qr)
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

server.get('/search/series', function (req, res, next) {
  res.send(series.map(function (s) {
    return {
      value: s.id,
      label: s.label,
    }
  }))
  next()
})

server.get('/search/series/:id/operations', function (req, res, next) {
  res.send(operations.filter(function (o) {
    return o.serie === req.params.id
  }).map(function (o) {
    return {
      value: o.id,
      label: o.label,
    }
  }))
  next()
})

server.get('/search/operations/:id/collections', function (req, res, next) {
  res.send(campaigns.filter(function (c) {
    return c.operation === req.params.id
  }).map(function (c) {
    return {
      value: c.id,
      label: c.label,
    }
  }))
  next()
})

server.post('/search', function (req, res, next) {
  var result = questionnairesRefInfos
  var params = req.params
  var body = JSON.parse(req.body)

  Object.keys(params).forEach(function(key){
    if(params[key] !== '') {
      result = result.filter(function (qr) {
        return qr[key] === params[key]
      })
    }
  })

  if(body.filter !== '') {
    result = result.filter(function (qr) {
      return qr.label.search(body.filter) !== -1
    })
  }

  res.send(result)

  next()
})



console.log('listening in http://localhost:' + listenPort)

server.listen(listenPort)
