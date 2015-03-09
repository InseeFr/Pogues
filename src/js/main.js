/** @jsx React.DOM */
var PoguesApp = require('./components/pogues-app');
var DataUtils = require('./utils/data-utils');
var React = require('react');

// Should be done on the server
var language = (navigator.language || navigator.browserLanguage).split('-')[0];
if (language !== 'fr') language = 'en';

// Load questionnaire list
// Should rather be done in the ComponentIsMounted function
DataUtils.loadQuestionnaireList();

React.render(
	<PoguesApp language={language}/>,
	document.getElementById('base'));
