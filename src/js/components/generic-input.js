/** @jsx React.DOM */
var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');

var hints = {'en': 'Enter a question title', 'fr': 'Entrez un intitulé de question'};

var GenericInput = React.createClass({

	getInitialState: function() {
		return {value: ''}
	},
	handleChange: function(event) {
		this.setState({value: event.target.value})
	},
	handleKeyDown: function(event) {
		if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
			var text = this.state.value.trim();
			if (text) {
				console.log('GenericInput value', text);
				PoguesActions.createModule(text);
			}
			this.setState({value: ''});
		}
	},
	render: function() {
		var hint = hints[this.props.language];
		return <input className="generic" type="text" value={this.state.value} placeholder={hint} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>;
	}
});

module.exports = GenericInput;