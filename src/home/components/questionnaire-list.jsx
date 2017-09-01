import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireListItem from 'home/components/questionnaire-list-item';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import { formatDate, getState } from 'utils/component/component-utils';

const logger = new Logger('QuestionnaireList', 'Components');

class QuestionnaireList extends Component {
  static propTypes = {
    questionnaires: PropTypes.array,
  };

  static defaultProps = {
    questionnaires: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  updateFilter(filter) {
    this.setState({
      filter: filter.toLowerCase(),
    });
  }

  render() {
    const questionnaires = this.props.questionnaires;
    logger.debug('Rendering QuestionnaireList component.');

    const list = questionnaires
      .filter(q => {
        return (
          this.state.filter === '' ||
          q.label.toLowerCase().indexOf(this.state.filter) >= 0 ||
          getState(q.final).toLowerCase().indexOf(this.state.filter) >= 0 ||
          (q.lastUpdatedDate && formatDate(q.lastUpdatedDate).toLowerCase().indexOf(this.state.filter) >= 0)
        );
      })
      .map(q => {
        return (
          <QuestionnaireListItem
            key={q.id}
            id={q.id}
            label={q.label}
            lastUpdatedDate={q.lastUpdatedDate}
            final={q.final}
          />
        );
      });

    return (
      <div id="questionnaire-list">
        {questionnaires.length > 0
          ? <div>
              <div className="ctrl-input">
                <input
                  className="form-control"
                  placeholder={Dictionary.search}
                  type="text"
                  onChange={e => this.updateFilter(e.target.value)}
                />
              </div>
              <div className="questionnaire-list_header">
                <div>
                  {Dictionary.QUESTIONNAIRE}
                </div>
                <div>
                  {Dictionary.state}
                </div>
                <div>
                  {Dictionary.lastUpdate}
                </div>
              </div>
              {list}
            </div>
          : <div className="questionnaire-list_noresults">
              {Dictionary.noQuestionnnaires}
            </div>}
      </div>
    );
  }
}

export default QuestionnaireList;
