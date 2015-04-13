var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');

var hints = {'en': 'Enter a questionnaire title', 'fr': 'Entrez un intitulé de questionnaire'};

var QuestionnaireEditor = React.createClass({

	getInitialState: function() {
		return {
			value: ''
		};
	},
	componentDidMount: function() {
		this.refs.input.getDOMNode().focus();
	},
	// TODO Reintegrate ENTER KEY handling (taking care of conflict
	// with _handleChange). Removed for the sake of simplicity.
/*	_handleKeyDown: function(event) {
		if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
			this._addQuestionnaire(this.state.name);
		}
	},*/
	_handleChange: function(event) {
		this.setState({
			value: event.target.value
		});
	},
	_addQuestionnaire: function () {
		PoguesActions.createQuestionnaire(this.state.value)
		this.setState({
			value: ''
		});
	},
	render: function() {
		var hint = hints[this.props.language];
		var additionalControls = '';
		if (this.state.active) additionalControls = 'More controls here';
		return (
			<div>
				<div className="input-group">
					<input className="form-control"
						type="text" ref="input" value={this.state.value}
						placeholder={hint} onChange={this._handleChange}
						onKeyDown={this._handleKeyDown}/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button"
							 onClick={this._addQuestionnaire}>+</button>
					</span>
				</div>
				<div><h3>{additionalControls}</h3></div>
			</div>
			)
	}
});

module.exports = QuestionnaireEditor;