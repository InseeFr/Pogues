/** @jsx React.DOM */
var React = require('react');
var Component = require('../components/component');

var Sequence = React.createClass({

	render: function() {
		console.log('Sequence rendering with props', this.props);

		if (this.props.sequence.children) {
			return (
				<div className="row module">
					<div className="col-md-10">
					 <h2 >{this.props.sequence.name}</h2>
					  {this.props.sequence.children.map(function(child, index) {
						  return (<div><h4 key={index}>{child.name}</h4><Component component={child}/></div>);
					  })}
					</div>
					<div className="col-md-2 sub-module">
					  <span className="fa fa-pencil fa-2x"></span>
					</div>
				</div>
			);
		} else {
			return(
				<div>
					<h2>{this.props.sequence.name}</h2>
				</div>
			);
		}
	}
});

module.exports = Sequence;
