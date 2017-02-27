import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Logger from '../logger/logger';

import { connect } from 'react-redux'
import { switchToQuestionnaire } from '../actions/app-state'
import { loadQuestionnaireList } from '../actions/questionnaire-list'
import { loadCodeListSpecs } from '../actions/code-list-specification'
import { removeQuestionnaire } from '../actions/questionnaire'
import { toArray, buildSortByKey } from '../utils/array-utils'

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
    const { questionnaires, viewQuestionnaire, removeQuestionnaire,
      allowRemoval } =  this.props
    logger.info('Rendering the questionnaires list.')
    return questionnaires ?
      <div className="list-group">
        <div>{questionnaires.length} questionnaire(s)</div>
        {_.map(questionnaires, ({id, label, name}) => (
          <span key={id} className="list-group-item">
            <a href="#" key={id} 
              onClick={() => viewQuestionnaire(id)}>
              {label}
              <span className="text-muted">
               <small> [ {name} ] </small>
              </span>
              <i className="fa fa-arrow-circle-right"></i>
            </a>
            { allowRemoval && 
            <a href="#" className="pull-right"
              onClick={e => {
                removeQuestionnaire(id)
                console.log('something')
                e.preventDefault()}}>
              <i className="fa fa-trash"></i>
            </a>
          }
          </span>
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
  questionnaires: PropTypes.object.isRequired,
  allowRemoval: PropTypes.bool.isRequired
}

/**
 * Filter the questionnaire list
 * @param  {array}  questionnaires questionnaire array to filter
 * @param  {string} filter         filter to apply
 * @return {object}                questionnaires by id filtered
 */
function filterQuestionnaires(questionnaires, filter) {
  return questionnaires.filter(qr => qr.label.toLowerCase().includes(filter))
}

const sortByLabel = buildSortByKey('label'); 

const mapStateToProps = state => ({
  questionnaires: 
    sortByLabel(
      filterQuestionnaires(
        toArray(state.questionnaireList),
        state.appState.questionnaireListFilter.toLowerCase()
      )),
  allowRemoval: state.config.allowRemovalOfQuestionnaire
})

const mapDispatchToProps = {
  viewQuestionnaire: switchToQuestionnaire,
  loadQuestionnaireList,
  loadCodeListSpecs,
  removeQuestionnaire
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireList)
