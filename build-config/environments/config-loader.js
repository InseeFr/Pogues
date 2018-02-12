const loaderUtils = require('loader-utils');
const fs = require('fs');

module.exports = function configLoader(remoteConfig) {
  const options = loaderUtils.getOptions(this);
  return fs.readFileSync(
    `${__dirname}/config.${options.environment}.js`,
    'utf8'
  );
};
