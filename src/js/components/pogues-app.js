/** @jsx React.DOM */
var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnairePicker = require('../components/questionnaire-picker');
var Questionnaire = require('../components/questionnaire');

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
		if (this.state.current === null) return (<QuestionnairePicker language={this.props.language}/>); 
		else {
			var title = QuestionnaireListStore.getCurrentQuestionnaire(this.state.current).name;
			console.log('PoguesApp calling Questionnaire with title', title);
			return (<Questionnaire title={title} language={this.props.language}/>);
		}
	}
});

module.exports = PoguesApp;