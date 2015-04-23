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
  selectWithId: function(id, event) {
    console.log('QuestionnairePicker.selectIndex', id);
    PoguesActions.selectQuestionnaire(id);
  },
  componentWillMount: function() {
    console.log('QuestionnaireList component will mount');
    //PoguesActions.getQuestionnaireList();
  },
  componentDidMount: function() {
    console.log('QuestionnaireList component did mount.');
    QuestionnaireListStore.addChangeListener(this._onChange);
    // FIXME doesn't work
    PoguesActions.getQuestionnaireList();
    // FIXME this one works, but its a hack
    //DataUtils.getQuestionnaireList();
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
        <div className="list-group">
          {questArray.map(function(questionnaire, index) {
            return (<a href="#" key={index} className="list-group-item" onClick={this.selectWithId.bind(this, questionnaire._id)}>
                      <span>{questionnaire._label}</span>
                      <span className="text-muted"><small> [ {questionnaire._name} ] </small></span>
                      <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                    </a>)
          }, this)}
        </div>
        );
    } else {
      // FIXME manage that view !
      return(<div>EMPTY</div>);
    }
  }
});

module.exports = QuestionnaireList;
