/** @jsx React.DOM */
var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');

var hints = {'en': 'Enter a title', 'fr': 'Entrez un intitulé'};
var labels = {'en': ['Sequence', 'Question'], 'fr': ['Séquence', 'Question']}

var GenericInput = React.createClass({

	getInitialState: function() {
		return {value: '', sequence: true, depth: 1}
	},
	handleChange: function(event) {
		this.setState({value: event.target.value})
	},
	toggleType: function(event) {
		// FIXME onClick works on <span/> or <p/> but not on <a/> 
		event.preventDefault();
		this.setState({sequence: !this.state.sequence});
		console.log('GenericInput toggled type', this.state);
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
		var inputClass = (this.state.sequence ? "gi-sequence" : "gi-question");
		var activeIndex = (this.state.sequence ? 0 : 1);
		var iconClass = (this.state.sequence ? "fa fa-list" : "fa fa-question-circle");
		return (
			<div className={inputClass}>
				<ul className="nav nav-tabs">
					{labels[this.props.language].map(function(label, index) {
						if(index === activeIndex) {
							return(
								<li key={index} role="presentation" className="active">
									<a href="#">{label}</a>
								</li>
							)
						} else {
							return(
								<li key={index} role="presentation"  className="toto">
									<a href="#" onClick={this.toggleType}>{label}</a>
								</li>
							)
						}
					})}
				</ul>
				<div className="input-group">
					<span className="input-group-addon">{this.state.depth}</span>
					<input className="form-control" type="text" ref="input" value={this.state.value} placeholder={hint} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
					<span className="input-group-addon" onClick={this.toggleType}><span className={iconClass}></span></span>
				</div>
			</div>
			)
	}
});

module.exports = GenericInput;
