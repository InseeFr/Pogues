/** @jsx React.DOM */
var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');

var title = {'en': 'Questionnaire outlook', 'fr': 'Aperçu du questionnaire'};

function getStateFromStore() {
	console.log('QuestionnaireOutlook getting state from store');
	return {
		questionnaire: QuestionnaireStore.getQuestionnaire()
	}
}

var QuestionnaireOutlook = React.createClass({

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
		return (
			<div className='outlook'>
				<h4>{title[this.props.language]}</h4>
				{this.state.questionnaire.modules.map(function(module) {
					return (<p>{module.name}</p>)
				})}
			</div>
		)
	}
});

module.exports = QuestionnaireOutlook;