var PoguesApp = require('./components/pogues-app');
var React = require('react');

// Should be done on the server
var language = (navigator.language || navigator.browserLanguage).split('-')[0];
if (language !== 'fr') language = 'en';

React.render(
	<PoguesApp language={language}/>,
	document.getElementById('base'));
