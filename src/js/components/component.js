var React = require('react');
var PoguesActions = require('../actions/pogues-actions');
var ComponentEditor = require('./component-editor');
var Logger = require('../logger/logger');

var logger = new Logger('Component', 'Components');

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
    logger.debug('Changing state for component ' + this.props.component.id + ' to: ', this.state);
    this.setState({active: !this.state.active});
  },

  render: function() {
    var highlightHandler = this.props.highlightHandler;
    var classes;
    var component = this.props.component;

    if (this.state.active) {
      return <ComponentEditor component={component} close={this._toggleActive}/>;
    } else {
      if (component instanceof SequenceModel) {
          classes = classNames({
            'sequence' : true,
            'row': false,
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
            'row': false,
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
var SequenceModel = require('../models/sequence');
var EditActivator = require('../components/edit-activator');
var classNames = require('classnames');