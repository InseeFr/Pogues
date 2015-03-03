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
		return (
			<div className='main'>
				<h1>{this.props.title}</h1>
				<h2>{introduction[this.props.language]}</h2>
				{this.state.questionnaire.modules.map(function(module, index) {
					return (<p>{index+1}. {module.name}</p>)
				})}
				<GenericInput language={this.props.language}/>
			</div>
		)
	}
});

module.exports = Questionnaire;