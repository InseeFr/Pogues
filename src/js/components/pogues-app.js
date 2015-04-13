var React = require('react');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnairePicker = require('../components/questionnaire-picker');
var Questionnaire = require('../components/questionnaire');
var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireOutlook = require('../components/questionnaire-outlook');
var Menu = require('./menu.js');
var config = require('../config/config');
var locale = require('../stores/dictionary-store');

var PoguesApp = React.createClass({

	_switchPicklerView: function() {
		this.setState({
			view: ViewTypes.PICKER
		});
	},
	_switchQuestionnaireView: function () {
		this.setState({
			view: ViewTypes.QUESTIONNAIRE
		});
	},
	getInitialState: function() {
		return {
			view: ViewTypes.PICKER
		}
	},

	render: function() {
		console.log('PoguesApp state', this.state);
		console.log('ENV : ' + (config.dev ? 'dev' : 'prod'));
		var child,
			title,
			filter;
		if (this.state.view === ViewTypes.PICKER) {
			filter = PoguesActions.filterQuestionnaires;
			child = <QuestionnairePicker setAppState={this._switchQuestionnaireView} language={this.props.language}/>;
			title = locale.tagline;
		}
		else if (this.state.view === ViewTypes.QUESTIONNAIRE) {
			filter = PoguesActions.filterComponents;
			title = '';
			console.log('PoguesApp calling Questionnaire with title', title);
			child =
				<Questionnaire/>
		}
		// FIXME title should be read from Questionnaire Store when
		// we are rendering a questionnaire:
		return (
			<div>
				<Menu handleFilter={filter} title={title} view={this.state.view}/>
				{child}
			</div>)
	}
});

module.exports = PoguesApp;
