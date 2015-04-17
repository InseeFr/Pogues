var React = require('react');
var PoguesActions = require('../actions/pogues-actions');

var Component = React.createClass({

  getInitialState: function() {
    return {active: false, over: false};
  },

  _handleMouseOver: function() {
    this.setState({over: true});
  },

  _handleMouseLeave: function() {
    this.setState({over: false});
  },

  _toggleActive: function() {
    console.log('Changing state for component ' + this.props.component.id, this.state);
    this.setState({active: !this.state.active});
    PoguesActions.editComponent(this.props.component.id);
  },

  render: function() {
    var highlightHandler = this.props.highlightHandler;
    var classes;
    var component = this.props.component;

    if (this.state.active) {
      if (component instanceof SequenceModel) {
        classes = classNames({
          'active-sequence' : true,
          'row': true,
          'highlight': highlightHandler ? highlightHandler.test(component.name) : false
        });
        return(
          <div id={component.id} className={classes}>
            <Sequence highlightHandler={this.props.highlightHandler} sequence={component} active={true}/>
          </div>
          );
      } else {
        classes = classNames({
          'active-question': true,
          'row': true,
          'highlight': highlightHandler ? highlightHandler.test(component.name) : false,
        });
        return(
          <div id={component.id} className={classes}>
            <Question highlightHandler={this.props.highlightHandler} question={component} active={true}/>
          </div>
          );
      }
    } else {
      if (component instanceof SequenceModel) {
          classes = classNames({
            'sequence' : true,
            'row': true,
            'highlight': highlightHandler ? highlightHandler.test(component.name) : false
          });
          return(
            <div id={component.id} className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
              <EditActivator componentId={component.id} componentOver={this.state.over} toggleActive={this._toggleActive}/>
              <Sequence highlightHandler={this.props.highlightHandler} sequence={component}/>
            </div>
            );
        } else {
          classes = classNames({
            'row': true,
            'highlight': highlightHandler ? highlightHandler.test(component.name) : false
          });
          return(
            <div id={component.id} className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
              <EditActivator componentId={component.id} componentOver={this.state.over} toggleActive={this._toggleActive}/>
              <Question highlightHandler={this.props.highlightHandler} question={component}/>
            </div>
            );
        }
    }
  }
});

module.exports = Component;

var Sequence = require('../components/sequence');
var Question = require('../components/question');
var SequenceModel = require('../models/Sequence');
var EditActivator = require('../components/edit-activator');
var classNames = require('classnames');