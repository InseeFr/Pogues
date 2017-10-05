var restify = require('restify')
var server = restify.createServer()
var listenPort = process.env.PORT || 5000

var questionnaires = require(__dirname + '/questionnaires')
var series = require(__dirname + '/series')
var operations = require(__dirname + '/operations')
var campaigns = require(__dirname + '/campaigns')
var questionnairesRefInfos = require(__dirname + '/questionnaires-ref-infos')
var units = require(__dirname + '/units')

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
  res.send(series)
  next()
})

server.get('/search/series/:id/operations', function (req, res, next) {
  res.send(operations.filter(function (o) {
    return o.parent === req.params.id
  }))
  next()
})

server.get('/search/operations/:id/collections', function (req, res, next) {
  res.send(campaigns.filter(function (c) {
    return c.parent === req.params.id
  }))
  next()
})

server.get('/search/context/collection/:id', function (req, res, next) {
  var campaign = campaigns.filter(function (c) {
    return c.id === req.params.id
  })[0]

  var operation  = operations.filter(function (o) {
    return o.id === campaign.parent
  })[0]

  res.send({
    dataCollectionId: req.params.id,
    serieId: operation.parent,
    operationId: campaign.parent
  })
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

server.get('/meta-data/units', function (req, res, next) {
  res.send(units.map(function (u) {
    return {
      id: u.uri,
      uri: u.uri,
      label: u.label,
    }
  }))
  next()
})



console.log('listening in http://localhost:' + listenPort)

server.listen(listenPort)
