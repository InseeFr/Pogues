var loaderUtils = require("loader-utils")
var fs = require("fs")

module.exports = function configLoader(remoteConfig) {
  var options = loaderUtils.getOptions(this)
  if(options.useLocalData) {
    var localConfig = fs.readFileSync(__dirname + "/config.local.js", "utf8")
    return localConfig
  } else {
    return remoteConfig
  }
};
