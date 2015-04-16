var React = require('react');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var PoguesActions = require('../actions/pogues-actions');
var AppStateStore = require('../stores/appstate-store');
var DataUtils = require('../utils/data-utils');
var locale = require('../stores/dictionary-store').getDictionary();

function getStateFromStore() {
  return {
    pending: false,
    questionnaires: QuestionnaireListStore.getQuestionnaires()
  }
}

var QuestionnaireList = React.createClass({

  _onChange: function() {
    this.setState(getStateFromStore());
  },
  // Get an array of questionnaires object from payload
  _questionnaireToArray: function(questionnaires) {
    var questArray = [];
    for (var key in questionnaires) {
      if (questionnaires.hasOwnProperty(key)) {
          questArray.push(questionnaires[key]);
      }
    }
    return questArray;
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
    console.log('QuestionnaireList component will mount');
    PoguesActions.getQuestionnaireList();
  },
  componentDidMount: function() {
    QuestionnaireListStore.addChangeListener(this._onChange);
    // Load questionnaire list
    // FIXME what ??? DataUtils.getQuestionnaireList();
  },
  componentWillUnmount: function() {
    QuestionnaireListStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log('QuestionnaireList rendering with state', this.state);
    console.dir(this.state);
    if(this.state.questionnaires) {
      var questArray = this._questionnaireToArray(this.state.questionnaires);
      return(
        <ul className="list-group">
          {questArray.map(function(questionnaire, index) {
            return (<li className="list-group-item"
                  key={index}>
                    <a href="#" onClick={this.selectIndex.bind(this, index)}>
                      <span>{questionnaire._label}</span>
                      <span className="id">({questionnaire._name})</span>
                      <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                    </a>
                  </li>)
          }, this)}
        </ul>
        );
    } else {
      return(<div>EMPTY</div>);
    }
  }
});

module.exports = QuestionnaireList;