/** @jsx React.DOM */
var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');
var GenericInput = require('../components/generic-input');

var introduction = {'en': 'Please specify your questionnaire', 'fr': 'Veuillez spécifier votre questionnaire'};

function getStateFromStore() {
	console.log('Questionnaire getting state from store');
	return {
		questionnaire: QuestionnaireStore.getQuestionnaire()
	}
}

var Questionnaire = React.createClass({

	_onChange: function() {
		this.setState(getStateFromStore());
	},
	getInitialState: function() {
		return getStateFromStore();
	},
	componentDidMount: function() {
		QuestionnaireStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		QuestionnaireStore.removeChangeListener(this._onChange);
	},
	render: function() {
		console.log('Questionnaire rendering with state', this.state);
		var invite = introduction[this.props.language];
		if (this.state.questionnaire.modules.length > 0) invite = '';
		return (
			<div className="col-md-9">
				<h1>{invite}</h1>
				{this.state.questionnaire.modules.map(function(module, index) {
					return (<h2 key={index}>{module.name}</h2>)
				})}
				<GenericInput language={this.props.language}/>
			</div>
		)
	}
});

module.exports = Questionnaire;