/*
Deployment script to an eXist container.
username and password must be provided through a JSON File.
*/
var fs = require('fs');
var request = require('request');
var authInfo = require('./deploy-auth.json');

// In case of trouble, set to true
request.debug = false;

var PATH = './dist';
var TARGET = 'http://s90datalift.ad.insee.intra:9150/exist/rest/db/pogues';

console.log('Starting deploy script');
console.log('Source is :' + PATH);
console.log('Target is : ' + TARGET);

function deployToServer(deployURL, file, filePath) {
  console.log('Attempt to deploy ' + file + ' to ' + deployURL);
  console.log('Path to file is : ' + filePath);
  // If the basic request object is used, it makes every request hit the proxy  =(
  // So, we're using a custom request object with a blank proxy
  var noProxyReq = request.defaults({'proxy':''});
  fs.createReadStream(filePath)
    .pipe(
      noProxyReq
        .put(deployURL)
        .auth(authInfo.user, authInfo.password)
        .on('error', function(err) { console.log('<!> ERROR ', err); })
        .on('response', function(resp) { console.log('<O> Status : ' + resp.statusCode); })
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
      console.log('Path is ' + filePath);
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
