/** @jsx React.DOM */
var React = require('react');

var Component = React.createClass({

	render: function() {

		console.log('Component rendering with props', this.props);

		if (this.props.component instanceof SequenceModel) {
			return(
				  <Sequence highlight={this.props.highlight} sequence={this.props.component}/>
				);
		} else {
			return(
				  <Question highlight={this.props.highlight} question={this.props.component}/>
				);
		}
	}
});

module.exports = Component;

var Sequence = require('../components/sequence');
var Question = require('../components/question');
var SequenceModel = require('../models/Sequence');