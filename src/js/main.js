require('./bootstrap');
// require('../css/bootstrap.min.css')
// require('../css/docs.min.css')
// require('../css/fa/css/font-awesome.min.css')
require('../css/pogues.css')

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root'

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

ReactDOM.render(
	<Root/>,
	document.getElementById('base'));


