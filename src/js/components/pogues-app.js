/** @jsx React.DOM */
var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnairePicker = require('../components/questionnaire-picker');
var Questionnaire = require('../components/questionnaire');
var QuestionnaireOutlook = require('../components/questionnaire-outlook');
var Menu = require('./menu.js');

var tagline = {'en': 'Questionnaire design and test', 'fr': 'Conception et test de questionnaires'};

function getStateFromStore() {
	return {
		current: QuestionnaireListStore.getCurrentQuestionnaireIndex()
	}
}

var PoguesApp = React.createClass({

	_onChange: function() {
		this.setState(getStateFromStore());
	},
	getInitialState: function() {
		return getStateFromStore();
	},
	componentDidMount: function() {
		QuestionnaireListStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		QuestionnaireListStore.removeChangeListener(this._onChange);
	},
	render: function() {
		console.log('PoguesApp state', this.state);
		var child,
			title;
		if (this.state.current === null) {
			child = <QuestionnairePicker language={this.props.language}/>; 
			title = tagline[this.props.language];
		}
		else {
			var title = QuestionnaireListStore.getCurrentQuestionnaire(this.state.current).name;
			console.log('PoguesApp calling Questionnaire with title', title);
			child = 
				<div className="container bs-docs-container">
					<div className="row">
						<Questionnaire language={this.props.language}/>
						<QuestionnaireOutlook language={this.props.language}/>
					</div>
				</div>
		}
		return (
			<div>
				<Menu search="" title={title} language={this.props.language}/>
				{child}
			</div>)
	}
});

module.exports = PoguesApp;