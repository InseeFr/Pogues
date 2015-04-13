var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var PoguesActions = require('../actions/pogues-actions');
var DataUtils = require('../utils/data-utils');

var inviteExisting = {'en': 'Select an existing questionnaire', 'fr': 'Sélectionner un questionnaire existant'};
var errorMessage = {'en': 'Could not retrieve questionnaire list', 'fr': 'Impossible de récupérer la liste des questionnaires'};

function getStateFromStore() {
	return {
		questionnaires: QuestionnaireListStore.getQuestionnaires()
	}
}

var QuestionnaireList = React.createClass({

	_onChange: function() {
		this.setState(getStateFromStore());
	},
	getInitialState: function() {
		return {
			pending: true,
			questionnaires: null
		}
	},
	selectIndex: function(index, event) {
		console.log('QuestionnairePicker.selectIndex', index);
		this.props.setAppState();
		PoguesActions.selectQuestionnaire(index); // Value is index
	},
	componentWillMount: function() {
		// TODO passer l'action pour charger le questionnaire list store
		PoguesActions.loadQuestionnaireList();
	},
	componentDidMount: function() {
		QuestionnaireListStore.addChangeListener(this._onChange);
		// Load questionnaire list
		DataUtils.loadQuestionnaireList();
	},
	componentWillUnmount: function() {
		QuestionnaireListStore.removeChangeListener(this._onChange);
	},

	render: function() {
		console.log('QuestionnaireList rendering with state', this.state);
		if (this.state.questionnaires === null) return (
			<div>
				<span className="fa fa-exclamation-triangle fa-3"></span>
				<span className="error-message">{errorMessage[this.props.language]}</span>
			</div>
		);
		else if (this.state.questionnaires.length === 0) return (
			<div>
				<span className="fa fa-spinner fa-pulse fa-3x"></span>
			</div>
		);
		else return (
			<div>
				<h1 className="page-header">{inviteExisting[this.props.language]}</h1>
				<ul>
					{this.state.questionnaires.map(function(questionnaire, index) {
						return (<li key={index} onClick={this.selectIndex.bind(this, index)}>{questionnaire.name}</li>)
					}, this)}
				</ul>
			</div>
		);
	}
});

module.exports = QuestionnaireList;