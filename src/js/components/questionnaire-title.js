var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var QuestionnaireStore = require('../stores/questionnaire-store');

function getStateFromStore() {
  console.log('QuestionnaireOutlook getting state from store');
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
    QuestionnaireStore.addChangeListener(this._onChange);
  },

  _getTitle: function() {
    var currentLabel = QuestionnaireStore.getQuestionnaire().label;
    return currentLabel == "" ? "EDIT ME" : currentLabel;
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
      console.warn(value);
      PoguesActions.editQuestionnaire('label', value);
    }
  },

  render: function() {
    if(this.state.editMode) {
      return(
        <input className="navbar nav" type="text"
        onKeyDown={this._handleKeyDown} placeholder={this.state.title} />
      );
    } else {
      return (
        <span className="navbar-text" onClick={this._handleClick}>{this.state.title}</span>
      );
    }
  }
});

module.exports = QuestionnaireTitle;
