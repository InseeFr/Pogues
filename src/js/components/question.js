/** @jsx React.DOM */
var React = require('react');
var Edit = require('../components/edit');

var Question = React.createClass({

	render: function() {

		return(
			<div className="row">
				<div className="col-md-10 component">
			    <h4>{this.props.question.name}</h4>
				</div>
				<Edit />
			</div>
			);
	}
});

module.exports = Question;
