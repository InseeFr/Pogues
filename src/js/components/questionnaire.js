/** @jsx React.DOM */
var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');
var Sequence = require('../components/sequence');
var GenericInput = require('../components/generic-input');
var PoguesMenu = require('../components/pogues-menu');
var classNames = require('classnames');
var introduction = {'en': 'Please specify your questionnaire', 'fr': 'Veuillez spécifier votre questionnaire'};
var errorMessage = {'en': 'Could not retrieve the questionnaire', 'fr': 'Impossible de récupérer le questionnaire'};


function getStateFromStore() {
	console.log('Questionnaire getting state from store');
	return {
		questionnaire: QuestionnaireStore.getQuestionnaire(),
		filter       : QuestionnaireStore.getFilter()
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
		var invite = introduction[this.props.language],
			filter = this.state.filter;

		if (this.state.questionnaire === null) return (
			<div>
				<span className="fa fa-exclamation-triangle fa-3"></span>
				<span className="error-message">{errorMessage[this.props.language]}</span>
			</div>
		);
		else if (!this.state.questionnaire) return (
			<div>
				<span className = "fa fa-spinner fa-pulse fa-2x"></span>
			</div>
		);
		if (this.state.questionnaire.children.length > 0) invite = '';
		return (
			<div className="col-md-9">
				<PoguesMenu language={this.props.language}/>
				<h1>{invite}</h1>
				{this.state.questionnaire.children.map(function(sequence, index) {
				    var classes = classNames({
				      'row': true,
				      'highlight': filter ? filter.test(sequence.name) : false
				    });
					return (<Sequence 
						className={classes}
						highlightHandler={filter}
						key={index}
						sequence={sequence}/>)
				})}
				<GenericInput language={this.props.language}/>
			</div>
		)
	}
});

module.exports = Questionnaire;
