import React from 'react';
import PoguesActions from '../actions/pogues-actions';
import ComponentEditor from './component-editor';
import Logger from '../logger/logger';
import Sequence from '../components/sequence';
import Question from '../components/question';
import SequenceModel from '../models/sequence';
import EditActivator from '../components/edit-activator';
import classNames from 'classnames';

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

export default Component;

