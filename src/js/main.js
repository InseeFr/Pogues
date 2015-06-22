require('./bootstrap');
var PoguesActions = require('./actions/pogues-actions.js');
var React = require('react');
var DictionaryStore = require('./stores/dictionary-store');
// TODO remove,temporary
var CodelistRepository = require('./utils/mockcodelist');
// Should be done on the server
var language = (navigator.language || navigator.browserLanguage).split('-')[0];
if (language !== 'fr') language = 'en';
PoguesActions.setLanguage(language);

// Set language has to be calle before requiring components
var PoguesApp = require('./components/pogues-app');

React.render(
	<PoguesApp/>,
	document.getElementById('base'));
