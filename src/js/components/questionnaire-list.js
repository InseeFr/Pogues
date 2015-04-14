var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var PoguesActions = require('../actions/pogues-actions');
var AppStateStore = require('../stores/appstate-store');
var DataUtils = require('../utils/data-utils');
var locale = require('../stores/dictionary-store').getDictionary();

function getStateFromStore() {
  return {
    questionnaires: QuestionnaireListStore.getQuestionnaires()
  }
}

var QuestionnaireList = React.createClass({

  _onChange: function() {
    this.setState(getStateFromStore());
  },
  getInitialState: function() {
    return {
      pending: true,
      questionnaires: null
    }
  },
  selectIndex: function(index, event) {
    console.log('QuestionnairePicker.selectIndex', index);
    PoguesActions.selectQuestionnaire(index); // Value is index
  },
  componentWillMount: function() {
    // TODO passer l'action pour charger le questionnaire list store
    PoguesActions.getQuestionnaireList();
  },
  componentDidMount: function() {
    QuestionnaireListStore.addChangeListener(this._onChange);
    // Load questionnaire list
    DataUtils.getQuestionnaireList();
  },
  componentWillUnmount: function() {
    QuestionnaireListStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log('QuestionnaireList rendering with state', this.state);
    if (this.state.questionnaires === null) return (
      <div>
        <span className="fa fa-exclamation-triangle fa-3"></span>
        <span className="error-message">{locale.errorMessageQuestList}</span>
      </div>
    );
    else if (this.state.questionnaires.length === 0) return (
      <div>
        <span className="fa fa-spinner fa-pulse fa-3x"></span>
      </div>
    );
    else return (
        <ul className="list-group">
          {this.state.questionnaires.map(function(questionnaire, index) {
            return (<li className="list-group-item"
                  key={index}>
                    <a href="#" onClick={this.selectIndex.bind(this, index)}>
                      <span>{questionnaire.label}</span>
                      <span className="id">({questionnaire.name})</span>
                      <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                    </a>
                  </li>)
          }, this)}
        </ul>
    );
  }
});

module.exports = QuestionnaireList;