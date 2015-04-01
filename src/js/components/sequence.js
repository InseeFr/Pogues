/** @jsx React.DOM */
var React = require('react');
var Component = require('../components/component');
var Question = require('../components/question');
var SequenceModel = require('../models/Sequence');
var EditActivator = require('../components/edit-activator');

var Sequence = React.createClass({

  getInitialState: function() {
    return {over: false};
  },

  _handleMouseOver: function() {
    this.setState({over: true});
  },

  _handleMouseLeave: function() {
    this.setState({over: false});
  },

  render: function() {
    console.log('Sequence rendering with props', this.props);

    var Tag = 'h' + this.props.sequence.depth;
    return (
      <div className="row" onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
        <div className="col-md-10">
         <Tag>{this.props.sequence.name}</Tag>
          {this.props.sequence.children.map(function(child, index) {
            //return (<Component component={child}/>);
            if (child instanceof SequenceModel) return(<Sequence key={index} sequence={child}/>);
            else return(<Question key={index} question={child}/>);
          })}
        </div>
        <EditActivator componentId={this.props.sequence.id} componentOver={this.state.over}/>
      </div>
    );
  }
});

module.exports = Sequence;
