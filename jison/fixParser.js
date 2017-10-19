// Inspired by https://github.com/knsv/mermaid/issues/277 quickfix
const { readFileSync, writeFileSync } = require('fs');
const path = require('path')
const xpathPath = path.resolve(__dirname, './generated-parsers/xpath-parser.js');

console.log(`Fixing XPath parser file at ${xpathPath}`);
const contents = readFileSync(xpathPath, 'utf8');

// Remove _token_stack label manually until fixed in jison:
// https://github.com/zaach/jison/issues/351
// https://github.com/zaach/jison/pull/352
let fixedContents = contents.split('_token_stack:').join('');

// Troublesome and designed for command line use of parser that we don't care about
fixedContents = contents.split('exports.main = function commonjsMain(args) {').join('');
fixedContents = [fixedContents[0], '}'].join('');


writeFileSync(xpathPath, fixedContents, 'utf8');
console.log('Fixed XPath parser!');
