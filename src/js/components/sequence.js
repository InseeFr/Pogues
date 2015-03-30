/** @jsx React.DOM */
var React = require('react');
var Component = require('../components/component');
var Edit = require('../components/edit');

var Sequence = React.createClass({

	render: function() {
		console.log('Sequence rendering with props', this.props);

			return (
				<div className="row component">
					<div className="col-md-10">
					 <h2 >{this.props.sequence.name}</h2>
					  {this.props.sequence.children.map(function(child, index) {
						  return (<div><Component component={child}/></div>);
					  })}
					</div>
					<Edit />
				</div>
			);

	}
});

module.exports = Sequence;
