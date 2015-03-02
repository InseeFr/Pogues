/** @jsx React.DOM */
var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');

var introduction = {'en': 'Please specify your questionnaire', 'fr': 'Veuillez spécifier votre questionnaire'};

var Questionnaire = React.createClass({

	getInitialState: function() {
		return {
			questionnaire: QuestionnaireStore.getQuestionnaire()
		}
	},
	render: function() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<h2>{introduction[this.props.language]}</h2>
			</div>
		)
	}
});

module.exports = Questionnaire;