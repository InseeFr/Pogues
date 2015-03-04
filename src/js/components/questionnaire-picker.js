/** @jsx React.DOM */
var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var PoguesActions = require('../actions/pogues-actions');

var tagline = {'en': 'Questionnaire design and test', 'fr': 'Conception et test de questionnaires'};
var invite = {'en': 'Select your questionnaire', 'fr': 'Sélectionnez votre questionnaire'};

function getStateFromStore() {
	return {
		questionnaires: QuestionnaireListStore.getQuestionnaires()
	}
}

var QuestionnairePicker = React.createClass({

	getInitialState: function() {
		return getStateFromStore();
	},
	selectIndex: function(event) {
		console.log('QuestionnairePicker.selectIndex', event.target.value);
		PoguesActions.selectQuestionnaire(event.target.value);
	},
	render: function() {
		console.log('QuestionnairePicker state', this.state);
		return (
			<div>
				<div className="bs-docs-header">
					<div className="container">
						<h1>Pogues</h1>
						<p>{tagline[this.props.language]}</p>
					</div>
				</div>
				<div className="container bs-docs-container">
					<h1 className="page-header">{invite[this.props.language]}</h1>
					<select onChange={this.selectIndex}>
						{this.state.questionnaires.map(function(questionnaire, index) {
							return (<option key={index} value={index}>{questionnaire.name}</option>)
						})}
					</select>
				</div>
			</div>
		)
	}
});

module.exports = QuestionnairePicker;