require('./bootstrap');
// require('../css/bootstrap.min.css')
// require('../css/docs.min.css')
// require('../css/fa/css/font-awesome.min.css')
//require('../css/pogues.css')
require('../css/pogues.css')

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root'
import 'babel-polyfill'


ReactDOM.render(
	<Root/>,
	document.getElementById('base'));


