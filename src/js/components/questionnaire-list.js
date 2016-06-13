import React from 'react';
import QuestionnaireListStore from '../stores/questionnaire-list-store';;
import PoguesActions from '../actions/pogues-actions';
import AppStateStore from '../stores/appstate-store';;
import DataUtils from '../utils/data-utils';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import _ from 'lodash';
import Logger from '../logger/logger';

var logger = new Logger('QuestionnaireList', 'Components');

function getStateFromStore() {
  return {
    pending: false,
    questionnaires: QuestionnaireListStore.getQuestionnaires(),
    filter: QuestionnaireListStore.getFilter()
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
    logger.debug('Select questionnaire with id: ', id);
    PoguesActions.selectQuestionnaire(id);
  },
  componentWillMount: function() {
    logger.debug('QuestionnaireList component will mount');
    //PoguesActions.getQuestionnaireList();
  },
  componentDidMount: function() {
    logger.debug('QuestionnaireList component did mount');
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
    logger.info('Rendering the questionnaires list.')
    if(this.state.questionnaires) {
      var questArray = this._questionnaireToArray(this.state.questionnaires);
      if (this.state.filter) {
        questArray = _.filter(questArray, questionnaire => questionnaire._label.indexOf(this.state.filter) !== -1);
    }
    return(
      <div className="list-group">
        <div>{questArray.length} questionnaire(s)</div>
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

export default QuestionnaireList;
