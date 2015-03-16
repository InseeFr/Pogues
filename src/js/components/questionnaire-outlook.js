/** @jsx React.DOM */
var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');

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
		// FIXME couldn't we be cleaner ???
		return (
			<div className="col-md-3">
				<nav className="bs-docs-sidebar hidden-print hidden-xs hidden-sm affix-top">
					<ul className="nav bs-docs-sidenav">
						{this.state.questionnaire.modules.map(function(module, index) {
							if( module.questions === undefined || module.questions.length == 0 ) {
								return (
									<li key={index}>{ module.name }</li>
								);
							} else {
								return (
									<li key={index}>
										{ module.name }
										<ul>
										{ module.questions.map(function(question, index) {
												return(
													<li>{question.name}</li>
													)
										}) }
										</ul>
									</li>
									)
							}

						})}
					</ul>
				</nav>
			</div>
		)
	}
});

module.exports = QuestionnaireOutlook;
