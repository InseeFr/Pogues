/*
Preprocessor using by Jest for compiling JSX files before tests
*/

var ReactTools = require('react-tools');

module.exports = {
  process: function(src) {
    return ReactTools.transform(src);
  }
};
