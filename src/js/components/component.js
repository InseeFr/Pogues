var React = require('react');

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
  },

  render: function() {

    var highlightHandler = this.props.highlightHandler;
    var classes;

    if (this.state.active) {
      if (this.props.component instanceof SequenceModel) {
        classes = classNames({
          'active-sequence' : true,
          'row': true,
          'highlight': highlightHandler ? highlightHandler.test(component.name) : false
        });
        return(
          <div id={this.props.component.id} className={classes}>
            <Sequence highlightHandler={this.props.highlightHandler} sequence={this.props.component} active={true}/>
          </div>
          );
      } else {
        classes = classNames({
          'active-question': true,
          'row': true,
          'highlight': highlightHandler ? highlightHandler.test(component.name) : false,
        });
        return(
          <div id={this.props.component.id} className={classes}>
            <Question highlightHandler={this.props.highlightHandler} question={this.props.component} active={true}/>
          </div>
          );
      }
    } else {
      if (this.props.component instanceof SequenceModel) {
          classes = classNames({
            'sequence' : true,
            'row': true,
            'highlight': highlightHandler ? highlightHandler.test(component.name) : false
          });
          return(
            <div id={this.props.component.id} className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
              <EditActivator componentId={this.props.component.id} componentOver={this.state.over} toggleActive={this._toggleActive}/>
              <Sequence highlightHandler={this.props.highlightHandler} sequence={this.props.component}/>
            </div>
            );
        } else {
          classes = classNames({
            'row': true,
            'highlight': highlightHandler ? highlightHandler.test(component.name) : false
          });
          return(
            <div id={this.props.component.id} className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
              <EditActivator componentId={this.props.component.id} componentOver={this.state.over} toggleActive={this._toggleActive}/>
              <Question highlightHandler={this.props.highlightHandler} question={this.props.component}/>
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