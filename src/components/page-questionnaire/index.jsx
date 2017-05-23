import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireContainer from 'containers/questionnaire/questionnaire';
import QuestionnaireNav from 'components/questionnaire/questionnaire-nav';
import { switchToQuestionnaire } from 'actions/app-state';

const logger = new Logger('PageQuestionnaire', 'Components');

const mapDispatchToProps = {
  switchToQuestionnaire,
};

export class PageQuestionnaire extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    switchToQuestionnaire: PropTypes.func.isRequired,
  };

  componentWillMount() {
    logger.debug('Rendering PageQuestionnaire component');
    // @TODO: It should not be necessary
    this.props.switchToQuestionnaire(this.id);
  }

  render() {
    const { match } = this.props;
    return (
      <div id="page-questionnaire">
        <QuestionnaireNav id={match.params.id} />
        <QuestionnaireContainer id={match.params.id} />
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(PageQuestionnaire);
