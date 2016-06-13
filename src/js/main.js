require('./bootstrap');
import PoguesActions from './actions/pogues-actions.js';
import React from 'react';
import ReactDOM from 'react-dom';
import DictionaryStore from './stores/dictionary-store';;
// Should be done on the server
var language = (navigator.language || navigator.browserLanguage).split('-')[0];
if (language !== 'fr') language = 'en';
PoguesActions.setLanguage(language);

// Set language has to be calle before requiring components
import PoguesApp from './components/pogues-app';

ReactDOM.render(
	<PoguesApp/>,
	document.getElementById('base'));
