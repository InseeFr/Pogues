import React from 'react';
import PoguesConstants from '../constants/pogues-constants';
import PoguesActions from '../actions/pogues-actions';
import QuestionnaireStore from '../stores/questionnaire-store';;
import Logger from '../logger/logger';

var logger = new Logger('QuestionnaireTitle', 'Components');

function getStateFromStore() {
  logger.debug('Getting state from store');
  return {
    questionnaire: QuestionnaireStore.getQuestionnaire()
  }
}

var QuestionnaireTitle =  React.createClass({

  getInitialState: function() {
    return {
      editMode: false,
      title: ''
    };
  },

  _onChange: function() {
    this.setState({
      editMode: false,
      title: this._getTitle()
    });
  },

  componentDidMount: function() {
    logger.debug('Component did mount');
    QuestionnaireStore.addChangeListener(this._onChange);
  },

  componentDidUpdate: function(prevProps, prevState) {
    logger.debug('Component did update, state is: ', this.state);
    if (this.state.editMode) {
      React.findDOMNode(this.refs.titleInput).focus();
    }
  },

  _getTitle: function() {
    // FIXME problem when workin locally, _getTitle is called
    // before current questionnaire is set in Questionnaire Store
    var questionnaire = QuestionnaireStore.getQuestionnaire();
    return questionnaire ? questionnaire.label : 'EDIT ME';
  },

  _handleClick: function() {
    this.setState({
      editMode: true,
      title : this._getTitle()
    });

  },

  _handleKeyDown: function(event) {
    var value = event.target.value;
    if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
      PoguesActions.editQuestionnaire('label', value);
    }
  },

  _handleInputChange: function(event) {
    var value = event.target.value;
    this.setState({title:value});
  },

  render: function() {
    if(this.state.editMode) {
      return(
        <div className="navbar-form navbar-left">
          <div className="form-group">
            <input ref="titleInput" type="text" className="form-control"
            onKeyDown={this._handleKeyDown} value={this.state.title} onChange={this._handleInputChange}/>
          </div>
        </div>
      );
    } else {
      return (
        <span className="navbar-text" onClick={this._handleClick}>{this.state.title}</span>
      );
    }
  }
});

export default QuestionnaireTitle;
