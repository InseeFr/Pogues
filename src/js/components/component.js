/** @jsx React.DOM */
var React = require('react');

var Component = React.createClass({

	render: function() {

		return(<h4>{this.props.component.name}</h4>);
	}
});

module.exports = Component;
