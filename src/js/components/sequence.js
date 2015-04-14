var React = require('react');


var Sequence = React.createClass({

  propTypes: {
    // This function enable the highlighting of a component, see Menu component
    highlightHandler: React.PropTypes.func,
    sequence: React.PropTypes.object
  },

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
    var highlightHandler = this.props.highlightHandler;
    var sequence = this.props.sequence;
    var classes = classNames({
      'sequence' : true,
      'row': true,
      'highlight': highlightHandler ? highlightHandler.test(sequence.name) : false
    });
    return (
      <div id={sequence.id} className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
        <div className="col-md-10">
         <Tag className="sequence-header">{sequence.name}</Tag>
          {sequence.children.map(function(child, index) {
            return (<Component highlightHandler={highlightHandler} component={child}/>);
          })}
        </div>
        <EditActivator componentId={sequence.id} componentOver={this.state.over}/>
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
