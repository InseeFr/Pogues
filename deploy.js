/*
Deployment script to an eXist container.
username and password must be provided through a JSON File.
*/
var fs = require('fs');
var request = require('request');
var authInfo = require('./deploy-auth.json');
var colors = require('colors');

// In case of trouble, set to true
request.debug = false;

var PATH = './dist';
var TARGET = 'http://s90datalift.ad.insee.intra:9050/exist/rest/db/pogues';

console.log('Starting deploy script'.bgWhite.bold.red);
console.log('Source is :'.yellow + PATH);
console.log('Target is : '.yellow + TARGET);

function deployToServer(deployURL, file, filePath) {
  console.log('Attempt to deploy ' + file + ' to ' + deployURL);
  // If the basic request object is used, it makes every request hit the proxy  =(
  // So, we're using a custom request object with a blank proxy
  var noProxyReq = request.defaults({'proxy':''});
  fs.createReadStream(filePath)
    .pipe(
      noProxyReq
        .put(deployURL)
        .auth(authInfo.user, authInfo.password)
        .on('error', function(err) { console.log('<!> ERROR '.bold.red, err); })
        .on('response', function(resp) {
          console.log('<O> Status : '.green + resp.statusCode);
          })
      );
}

function getWebRelativePath(filePath) {
  return filePath.substring(PATH.length);
}

function recurse(path) {
  console.log('Recurse in ' + path);
  // Read directory
  fs.readdir(path, function(err, files) {
    if(err) throw err;
    // Browse
    files.forEach(function(file) {
      console.log('Stumble upon a file/dir -->' + file);
      var filePath = path+'/'+file;
      // Get info
      fs.stat(filePath, function(err, stats) {
        if(stats.isDirectory()) {
          console.log('Found a directory, recurse.');
          recurse(filePath);
        } else if (stats.isFile()) {
          // Deploy to server
          var requestURL = TARGET + getWebRelativePath(filePath);
          console.log('Request URL will be : ' + requestURL);
          deployToServer(requestURL, file, filePath);
        }
      });
    });
  });
}

recurse(PATH);
