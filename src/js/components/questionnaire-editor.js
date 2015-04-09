var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');

var hints = {'en': 'Enter a questionnaire title', 'fr': 'Entrez un intitulé de questionnaire'};

var QuestionnaireEditor = React.createClass({

	getInitialState: function() {
		return {value: '', active: false}
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
				console.log('QuestionnaireEditor value', text);
				PoguesActions.createQuestionnaire(text);
			}
			this.setState({value: ''});
		}
	},
	activate: function () {
		this.setState({active: true});
	},
	render: function() {
		var hint = hints[this.props.language];
		var additionalControls = '';
		if (this.state.active) additionalControls = 'More controls here';
		return (
			<div>
				<div className="input-group">
					<input className="form-control" type="text" ref="input" value={this.state.value} placeholder={hint} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button" onClick={this.activate}>+</button>
					</span>
				</div>
				<div><h3>{additionalControls}</h3></div>
			</div>
			)
	}
});

module.exports = QuestionnaireEditor;