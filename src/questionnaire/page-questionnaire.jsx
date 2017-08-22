import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireContainer from 'questionnaire/containers/questionnaire';
import QuestionnaireNavContainer from 'questionnaire/containers/questionnaire-nav';
import GenericInputContainer from 'questionnaire/containers/generic-input';
import { loadQuestionnaireIfNeeded } from 'actions/questionnaire';
import {
  setActiveQuestionnaire,
  setActiveComponents,
  setActiveCodeLists,
  setActiveCalculatedVariables,
} from 'actions/app-state';

const logger = new Logger('PageQuestionnaire', 'Components');

const mapStateToProps = (state, { params: { id } }) => ({
  questionnaire: state.questionnaireById[id],
  components: state.componentByQuestionnaire[id],
  codeLists: state.codeListByQuestionnaire[id],
  calculatedVariables: state.calculatedVariableByQuestionnaire[id],
});

const mapDispatchToProps = {
  loadQuestionnaireIfNeeded,
  setActiveQuestionnaire,
  setActiveComponents,
  setActiveCodeLists,
  setActiveCalculatedVariables,
};

export class PageQuestionnaire extends Component {
  static propTypes = {
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    setActiveQuestionnaire: PropTypes.func.isRequired,
    setActiveComponents: PropTypes.func.isRequired,
    setActiveCodeLists: PropTypes.func.isRequired,
    setActiveCalculatedVariables: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    questionnaire: PropTypes.object,
    components: PropTypes.object,
    codeLists: PropTypes.object,
    calculatedVariables: PropTypes.object,
  };

  static defaultProps = {
    questionnaire: {},
    components: {},
    codeLists: {},
    calculatedVariables: {},
  };

  componentWillMount() {
    logger.debug('Rendering PageQuestionnaire component');
    this.props.loadQuestionnaireIfNeeded(this.props.params.id);
    this.setActive(
      this.props.questionnaire,
      this.props.components,
      this.props.codeLists,
      this.props.calculatedVariables
    );
  }
  componentWillUpdate(nextProps) {
    const nextQuestionnaireId = nextProps.questionnaire.id;
    if (nextQuestionnaireId && nextQuestionnaireId !== this.props.questionnaire.id) {
      this.setActive(nextProps.questionnaire, nextProps.components, nextProps.codeLists, nextProps.calculatedVariables);
    }
  }

  setActive(questionnaire, components, codeLists, calculatedVariables) {
    this.props.setActiveQuestionnaire(questionnaire);
    this.props.setActiveComponents(components);
    this.props.setActiveCodeLists(codeLists);
    this.props.setActiveCalculatedVariables(calculatedVariables);
  }

  render() {
    return (
      <div id="page-questionnaire">
        <QuestionnaireNavContainer />
        <QuestionnaireContainer />
        <GenericInputContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageQuestionnaire);
