/** @jsx React.DOM */
var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var PoguesActions = require('../actions/pogues-actions');

var welcome = {'en': 'Welcome to Pogues', 'fr': 'Bienvenue dans Pogues'};
var introduction = {'en': 'I am the questionnaire picker', 'fr': 'Je suis le sélecteur de questionnaire'};

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
				<h1>{welcome[this.props.language]}</h1>
				<h2>{introduction[this.props.language]}</h2>
				<select onChange={this.selectIndex}>
					{this.state.questionnaires.map(function(questionnaire, index) {
						return (<option key={index} value={index}>{questionnaire.name}</option>)
					})}
				</select>
			</div>
		)
	}
});

module.exports = QuestionnairePicker;