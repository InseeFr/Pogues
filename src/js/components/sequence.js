/** @jsx React.DOM */
var React = require('react');


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
    //console.log('Sequence rendering with props', this.props);
    var Tag = 'h' + this.props.sequence.depth;
    var hh = this.props.highlightHandler;
    var classes = classNames({
      'row': true,
      'highlight': hh ? hh.test(this.props.sequence.name) : false
    });
    return (
      <div className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
        <div className="col-md-10">
         <Tag>{this.props.sequence.name}</Tag>
          {this.props.sequence.children.map(function(child, index) {
            return (<Component highlightHandler={hh} component={child}/>);
          })}
        </div>
        <EditActivator componentId={this.props.sequence.id} componentOver={this.state.over}/>
      </div>
    );
  }
});

module.exports = Sequence;

var Component = require('../components/component');
var Question = require('../components/question');
var SequenceModel = require('../models/Sequence');
var EditActivator = require('../components/edit-activator');
var classNames = require('classnames');