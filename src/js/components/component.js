/** @jsx React.DOM */
var React = require('react');
var Sequence = require('../components/sequence');
var Question = require('../components/question');
var SequenceModel = require('../models/sequence');

var Component = React.createClass({

	render: function() {

		if (this.props.component instanceof SequenceModel)
			return(<Sequence sequence={this.props.component}/>);
		else return(<Question question={this.props.component}/>);
	}
});

module.exports = Component;
