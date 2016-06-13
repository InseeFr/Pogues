import React from 'react';
import PoguesConstants from '../constants/pogues-constants';
import PoguesActions from '../actions/pogues-actions';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import Logger from '../logger/logger';

var logger = new Logger('GenericInput', 'Components');

var SLASH = /\//,
	PLUS = /\+/,
	MINUS = /\-/;

var GenericInput = React.createClass({
	getInitialState: function() {
		return {value: '', sequence: true, depth: 1, refDepth: 1};
	},
	handleChange: function(event) {
		var text = event.target.value;
		if (text.startsWith('/')) {
			this.setState({sequence: !this.state.sequence, value: ''});
		}
		else if (text.startsWith('+') && this.state.sequence) {
			this.increaseDepth();
			this.setState({value: ''});
		}
		else if (text.startsWith('-') && this.state.sequence) {
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
	},
	componentDidMount: function() {

	},
	handleKeyDown: function(event) {
		logger.debug('Handling keydown.');
		var text = this.state.value;
		// FIXME a bit of a hack to handle the right level for questions inside of sequences
		// we increment the level seen in the UI if we know it's a question we're adding
		var realDepth = this.state.sequence ? this.state.depth : (this.state.depth + 1);
		if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
			if (text) {
				logger.debug('Value is', text, ' -- real depth is', realDepth);
				PoguesActions.addComponent({
					sequence: this.state.sequence,
					depth: realDepth,
					text: text});
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

export default GenericInput;
