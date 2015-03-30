/** @jsx React.DOM */
var React = require('react');
var Component = require('../components/component');
var Question = require('../components/question');
var SequenceModel = require('../models/Sequence');
var Edit = require('../components/edit');

var Sequence = React.createClass({

	render: function() {
		console.log('Sequence rendering with props', this.props);

			return (
				<div className="row component">
					<div className="col-md-10">
					 <h2 >{this.props.sequence.name}</h2>
					  {this.props.sequence.children.map(function(child, index) {
						  //return (<Component component={child}/>);
						  if (child instanceof SequenceModel) return(<Sequence key={index} sequence={child}/>);
						  else return(<Question key={index} question={child}/>);
					  })}
					</div>
					<Edit />
				</div>
			);

	}
});

module.exports = Sequence;
