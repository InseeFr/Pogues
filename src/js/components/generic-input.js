var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var locale = require('../stores/dictionary-store').getDictionary();

var SLASH = /\//,
	PLUS = /\+/,
	MINUS = /\-/;

var GenericInput = React.createClass({

	getInitialState: function() {
		return {value: '', sequence: true, depth: 1, refDepth: 1};
	},
	handleChange: function(event) {
		console.log(event.keyCode);
		var text = event.target.value;
		if (text.match(SLASH)) {
			this.setState({sequence: !this.state.sequence, value: ''});
		}
		else if (text.match(PLUS) && this.state.sequence) {
			this.increaseDepth();
			this.setState({value: ''});
		}
		else if (text.match(MINUS) && this.state.sequence) {
			this.decreaseDepth();
			this.setState({value: ''});
		}
		else {
			this.setState({value: text});
		}
	},
	decreaseDepth: function() {
		if (this.state.depth > 1) {
			this.setState({depth: this.state.depth - 1});
			return true;
		} else return false;
	},
	increaseDepth: function() {
		if (this.state.depth <= this.state.refDepth) {
			this.setState({depth: this.state.depth + 1});
			return true;
		} else return false;
	},
	toggleType: function(event) {
		event.preventDefault();
		this.setState({sequence: !this.state.sequence});
		console.log('GenericInput toggled type', this.state);
	},
	componentDidMount: function() {
		this.refs.input.getDOMNode().focus();
	},
	handleKeyDown: function(event) {
		var text = this.state.value;
		if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
			if (text) {
				console.log('GenericInput value', text);
				PoguesActions.addComponent({sequence: this.state.sequence, depth: this.state.depth, text: text});
			}
			this.setState({value: ''});
			return;
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
