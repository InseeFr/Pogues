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
			<div className="generic bs-example">
				<div >
					<ul className="nav nav-tabs">
						<li role="presentation" className="active">
							<a href="#">Séquence</a>
						</li>
						<li role="presentation">
							<a href="#">Question</a>
						</li>
					</ul>
				</div>
				<div >&nbsp;</div>
				<div >
					<input className="form-control" type="text" ref="input" value={this.state.value} placeholder={hint} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
				</div>
			</div>
			)
	}
});

module.exports = GenericInput;
