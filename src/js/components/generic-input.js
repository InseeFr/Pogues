var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var locale = require('../stores/dictionary-store').getDictionary();

var GenericInput = React.createClass({

	getInitialState: function() {
		return {value: '', sequence: true, depth: 1, refDepth: 1};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	decreaseDepth: function() {
		if (this.state.depth > 1) this.setState({depth: this.state.depth - 1});
	},
	increaseDepth: function() {
		if (this.state.depth <= this.state.refDepth) this.setState({depth: this.state.depth + 1});
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
				PoguesActions.addComponent({sequence: this.state.sequence, depth: this.state.depth, text: text});
			}
			this.setState({value: ''});
		}
	},
	render: function() {
		var inputClass = (this.state.sequence ? "gi-sequence" : "gi-question");
		var activeIndex = (this.state.sequence ? 0 : 1);
		var iconClass = (this.state.sequence ? "fa fa-list" : "fa fa-question-circle");
		var leftSymbol = ((this.state.sequence) && (this.state.depth > 1)) ?  'fa fa-chevron-left' : 'fa fa-square';
		var rightSymbol = ((this.state.sequence) && (this.state.depth <= this.state.refDepth)) ?  'fa fa-chevron-right' : 'fa fa-square';

		return (
			<div className={inputClass}>
				<ul className="nav nav-tabs">
					{[locale.sequence, locale.question].map(function(label, index) {
						if (index === activeIndex) {
							return(
								<li key={index} role="presentation" className="active">
									<a href="#">{label}</a>
								</li>
							)
						} else {
							return(
								<li key={index} role="presentation">
									<a href="#" onClick={this.toggleType}>{label}</a>
								</li>
							)
						}
					}, this)}
				</ul>
				<div className="input-group">
					<span className="input-group-addon">
						<span className={leftSymbol} onClick={this.decreaseDepth}></span>
						<span>{this.state.depth}</span>
						<span className={rightSymbol} onClick={this.increaseDepth}></span>
					</span>
					<input className="form-control" type="text" ref="input"
						 value={this.state.value} placeholder={locale.enterTitle}
						 onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
					<span className="input-group-addon" onClick={this.toggleType}><span className={iconClass}></span></span>
				</div>
			</div>
			)
	}
});

module.exports = GenericInput;
