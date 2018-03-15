const restify = require('restify');
const fs = require('fs');
const server = restify.createServer();
const listenPort = process.env.PORT || 5000;
const questionnaires = require(__dirname + '/questionnaires');
const series = require(__dirname + '/series');
const operations = require(__dirname + '/operations');
const campaigns = require(__dirname + '/campaigns');
const questionnairesRefInfos = require(__dirname + '/questionnaires-ref-infos');
const codesListsRefInfos = require(__dirname + '/codes-lists-ref-infos');
const units = require(__dirname + '/units');

restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('Location');

function getQuestionnairePosition(questionnaires, id) {
  for (var i = 0; i < questionnaires.length; i++) {
    if (questionnaires[i].id === id) {
      return i;
    }
  }

  return -1;
}

server.use(
  restify.CORS({
    headers: ['Location'],
    credentials: true
  })
);

server.use(restify.bodyParser());
server.use(restify.queryParser());

server.get('/questionnaires/search', function(req, res, next) {
  // @TODO: Take into account the property "owner"
  res.send(questionnaires);
  next();
});

server.get('/user/attributes', function(req, res, next) {
  res.send({
    id: 'FAKEID',
    name: 'Fake user',
    permission: 'FAKEPERMISSION'
  });
  next();
});

server.get('/questionnaire/:id', function(req, res, next) {
  var position = getQuestionnairePosition(questionnaires, req.params.id);
  var questionnaire = position !== -1 ? questionnaires[position] : {};
  res.send(questionnaire);
  next();
});

server.put('/questionnaire/:id', function(req, res, next) {
  var qr = req.body;
  var position = getQuestionnairePosition(questionnaires, req.params.id);
  if (position > -1) {
    questionnaires.splice(position, 1);
  }

  questionnaires.push(qr);
  res.send();
  next();
});

server.post('/questionnaires', function(req, res, next) {
  var qr = req.body;
  questionnaires.push(qr);
  res.header(
    'Location',
    'http://' + req.headers.host + '/questionnaires/' + qr.id
  );
  res.send();
  next();
});

server.get('/search/series', function(req, res, next) {
  res.send(series);
  next();
});

server.get('/search/series/:id/operations', function(req, res, next) {
  res.send(
    operations.filter(function(o) {
      return o.parent === req.params.id;
    })
  );
  next();
});

server.get('/search/operations/:id/collections', function(req, res, next) {
  res.send(
    campaigns.filter(function(c) {
      return c.parent === req.params.id;
    })
  );
  next();
});

server.get('/search/context/collection/:id', function(req, res, next) {
  var campaign = campaigns.filter(function(c) {
    return c.id === req.params.id;
  })[0];

  var operation = operations.filter(function(o) {
    return o.id === campaign.parent;
  })[0];

  res.send({
    dataCollectionId: req.params.id,
    serieId: operation.parent,
    operationId: campaign.parent
  });
  next();
});

server.post('/search', function(req, res, next) {
  var body = JSON.parse(req.body);
  var typeItem = body.types[0];
  var result = [];

  if (typeItem === 'Instrument') {
    result = questionnairesRefInfos;
  } else {
    result = codesListsRefInfos;
  }

  var params = req.params;

  Object.keys(params).forEach(function(key) {
    if (params[key] !== '') {
      result = result.filter(function(qr) {
        return qr[key] === params[key];
      });
    }
  });

  if (body.filter !== '') {
    result = result.filter(function(qr) {
      return qr.title.search(body.filter) !== -1;
    });
  }

  res.send(result);

  next();
});

server.get('/meta-data/units', function(req, res, next) {
  res.send(
    units.map(function(u) {
      return {
        id: u.uri,
        uri: u.uri,
        label: u.label
      };
    })
  );
  next();
});

function setResponseHeaders(res, filename) {
  res.header('Content-disposition', 'inline; filename=' + filename);
  res.header('Content-type', 'application/pdf');
}

server.post(
  '/transform/visualize/:dataCollection/:questionnaire',
  (req, res, next) => {
    res.end('http://google.fr');
  }
);
server.post('/transform/visualize-pdf', (req, res, next) => {
  const filename = __dirname + '/test.pdf';
  const data = fs.readFileSync(filename);
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=some_file.pdf',
    'Content-Length': data.length,
    'Access-Control-Expose-Headers': 'Content-Disposition'
  });
  res.end(data);
});
server.post('/transform/visualize-spec', (req, res, next) => {
  const filename = __dirname + '/test.odt';
  const data = fs.readFileSync(filename);
  res.writeHead(200, {
    'Content-Type': 'application/vnd.oasis.opendocument.text',
    'Content-Disposition': 'attachment; filename=some_file.odt',
    'Content-Length': data.length,
    'Access-Control-Expose-Headers': 'Content-Disposition'
  });
  res.end(data);
});

console.log('listening in http://localhost:' + listenPort);

server.listen(listenPort);
