import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Logger from '../logger/logger';

import { connect } from 'react-redux'
import { switchToQuestionnaire } from '../actions/app-state'
import { loadQuestionnaireList } from '../actions/questionnaire-list'
import { loadCodeListSpecs } from '../actions/code-list-specification'

var logger = new Logger('QuestionnaireList', 'Components');

class QuestionnaireList extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.loadQuestionnaireList()
    this.props.loadCodeListSpecs()
  }

  render() {
    const { questionnaires, viewQuestionnaire } = this.props
    logger.info('Rendering the questionnaires list.')
    return questionnaires ?
      <div className="list-group">
        <div>{questionnaires.length} questionnaire(s)</div>
        {_.map(questionnaires, (questionnaire, id) => (
          <a href="#" key={id} className="list-group-item"
            onClick={() => viewQuestionnaire(questionnaire.id)}>
            <span>{questionnaire.label}</span>
            <span className="text-muted">
              <small> [ {questionnaire.name} ] </small>
            </span>
            <span className="pull-right">
              <i className="fa fa-arrow-circle-right"></i>
            </span>
          </a>
          ))}
      </div> :
      // FIXME manage that view !
      <div>EMPTY</div>
  }
}

QuestionnaireList.propTypes = {
  loadQuestionnaireList: PropTypes.func.isRequired,
  loadCodeListSpecs: PropTypes.func.isRequired,
  viewQuestionnaire: PropTypes.func.isRequired,
  questionnaires: PropTypes.object.isRequired
}

/**
 * Filter the questionnaire list
 * @param  {object} questionnaires questionnaires by id
 * @param  {string} filter         filter to apply
 * @return {object}                questionnaires by id filtered
 */
function filterQuestionnaires(questionnaires, filter) {
  return _.pick(questionnaires, (qr, id) => 
                  qr.label.toLowerCase().includes(filter))
}

// TODO retri
const mapStateToProps = state => ({
  questionnaires: 
    filterQuestionnaires(
      state.questionnaireList,
      state.appState.questionnaireListFilter.toLowerCase())
})

const mapDispatchToProps = {
  viewQuestionnaire: switchToQuestionnaire,
  loadQuestionnaireList,
  loadCodeListSpecs
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireList)
