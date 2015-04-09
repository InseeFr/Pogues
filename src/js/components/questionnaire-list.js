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
		return getStateFromStore();
	},
	selectIndex: function(event) {
		console.log('QuestionnairePicker.selectIndex', event.target.value);
		PoguesActions.selectQuestionnaire(event.target.value); // Value is index
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
				<select className="form-control" onChange={this.selectIndex}>
					{this.state.questionnaires.map(function(questionnaire, index) {
						return (<option key={index} value={index}>{questionnaire.name}</option>)
					})}
				</select>
			</div>
		);
	}
});

module.exports = QuestionnaireList;