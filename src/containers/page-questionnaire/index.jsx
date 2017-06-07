import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireContainer from 'containers/questionnaire/questionnaire';
import QuestionnaireNav from 'components/questionnaire/questionnaire-nav';
import GenericInputContainer from 'containers/generic-input/generic-input';
import { setDefaultStateQuestionnaire } from 'actions/app-state';
import { loadCodeListSpecs } from 'actions/code-list-specification';

const logger = new Logger('PageQuestionnaire', 'Components');

const mapDispatchToProps = {
  setDefaultStateQuestionnaire,
  loadCodeListSpecs,
};

export class PageQuestionnaire extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    setDefaultStateQuestionnaire: PropTypes.func.isRequired,
    loadCodeListSpecs: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.questionnaireId = props.params.id;
  }

  componentWillMount() {
    logger.debug('Rendering PageQuestionnaire component');
    this.props.setDefaultStateQuestionnaire(this.questionnaireId);
    this.props.loadCodeListSpecs();
  }

  render() {
    return (
      <div id="page-questionnaire">
        <QuestionnaireNav id={this.questionnaireId} />
        <QuestionnaireContainer id={this.questionnaireId} />
        <GenericInputContainer questionnaireId={this.questionnaireId} />
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(PageQuestionnaire);
