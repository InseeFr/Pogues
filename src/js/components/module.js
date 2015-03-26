/** @jsx React.DOM */
var React = require('react');

var Module = React.createClass({

	render: function() {
		console.log('Rendering module with props', this.props);

		if (this.props.module.questions) {
			return (
				<div className="row module">
					<div className="col-md-10">
					 <h2 >{this.props.module.name}</h2>
					  {this.props.module.questions.map(function(question, index) {
						  return (<h4 key={index}>{question.name}</h4>)
					  })}
					</div>
					<div className="col-md-2 sub-module">
					  <i className="fa fa-pencil fa-2x"></i>
					</div>
				</div>
			);
		} else {
			return(
				<div>
					<h2>{this.props.module.name}</h2>
				</div>
			);
		}
	}
});

module.exports = Module;
