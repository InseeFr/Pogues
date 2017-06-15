import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireContainer from 'containers/questionnaire/questionnaire';
import QuestionnaireNav from 'components/questionnaire/questionnaire-nav';
import GenericInputContainer from 'containers/generic-input/generic-input';
import { loadQuestionnaireIfNeeded } from 'actions/questionnaire';

const logger = new Logger('PageQuestionnaire', 'Components');

const mapDispatchToProps = {
  loadQuestionnaireIfNeeded,
};

export class PageQuestionnaire extends Component {
  static propTypes = {
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    logger.debug('Rendering PageQuestionnaire component');
    this.props.loadQuestionnaireIfNeeded(this.props.params.id);
  }

  render() {
    const questionnaireId = this.props.params.id;
    return (
      <div id="page-questionnaire">
        <QuestionnaireNav />
        <QuestionnaireContainer questionnaireId={questionnaireId} />
        <GenericInputContainer />
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(PageQuestionnaire);
