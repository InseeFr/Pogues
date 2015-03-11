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
	componentDidMount: function() {
		this.refs.input.getDOMNode().focus();
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
		return (
			<div>
				<ul className="nav nav-tabs"><li className="active">Séquence</li><li>Question</li></ul>
				<input className="form-control" type="text" ref="input" value={this.state.value} placeholder={hint} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
			</div>
			)
	}
});

module.exports = GenericInput;