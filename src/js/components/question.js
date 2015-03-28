/** @jsx React.DOM */
var React = require('react');

var Question = React.createClass({

	render: function() {

		return(<h4>{this.props.question.name}</h4>);
	}
});

module.exports = Question;
