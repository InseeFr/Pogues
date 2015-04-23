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
    console.log('[QuestionnaireTitle] Component did mount.');
    QuestionnaireStore.addChangeListener(this._onChange);
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('[QuestionnaireTitle] Component did update');
    if(this.state.editMode) {
      console.log('[QuestionnaireTitle] Focus on title input');
      React.findDOMNode(this.refs.titleInput).focus();
    }
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

module.exports = QuestionnaireTitle;
