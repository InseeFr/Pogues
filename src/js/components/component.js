var React = require('react');

var Component = React.createClass({

	render: function() {

		if (this.props.component instanceof SequenceModel) {
			return(
				  <Sequence highlightHandler={this.props.highlightHandler} sequence={this.props.component}/>
				);
		} else {
			return(
				  <Question highlightHandler={this.props.highlightHandler} question={this.props.component}/>
				);
		}
	}
});

module.exports = Component;

var Sequence = require('../components/sequence');
var Question = require('../components/question');
var SequenceModel = require('../models/Sequence');
