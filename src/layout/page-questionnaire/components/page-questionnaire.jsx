import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';
// import { QuestionnaireListComponents } from 'layout/questionnaire-list-components';
import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { GenericInput } from 'layout/generic-input';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

// Prop types and default props

export const propTypes = {
  id: PropTypes.string.isRequired,
  loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
  setActiveQuestionnaire: PropTypes.func.isRequired,
  setActiveComponents: PropTypes.func.isRequired,
  setActiveCodeLists: PropTypes.func.isRequired,
  setActiveVariables: PropTypes.func.isRequired,
  questionnaire: PropTypes.object,
  components: PropTypes.object,
  codeLists: PropTypes.object,
  calculatedVariables: PropTypes.object,
  externalVariables: PropTypes.object,
  collectedVariablesByQuestion: PropTypes.object,
};

export const defaultProps = {
  questionnaire: {},
  components: {},
  codeLists: {},
  calculatedVariables: {},
  externalVariables: {},
  collectedVariablesByQuestion: {},
};

class PageQuestionnaire extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillMount() {
    const {
      id,
      questionnaire,
      components,
      codeLists,
      calculatedVariables,
      externalVariables,
      collectedVariablesByQuestion,
    } = this.props;

    this.props.loadQuestionnaireIfNeeded(id);

    this.setActive(
      questionnaire,
      components,
      codeLists,
      calculatedVariables,
      externalVariables,
      collectedVariablesByQuestion
    );
  }

  componentWillUpdate(nextProps) {
    const nextQuestionnaireId = nextProps.questionnaire.id;
    if (nextQuestionnaireId && nextQuestionnaireId !== this.props.questionnaire.id) {
      const {
        questionnaire,
        components,
        codeLists,
        calculatedVariables,
        externalVariables,
        collectedVariablesByQuestion,
      } = nextProps;

      this.setActive(
        questionnaire,
        components,
        codeLists,
        calculatedVariables,
        externalVariables,
        collectedVariablesByQuestion
      );
    }
  }

  setActive(
    questionnaire,
    components,
    codeLists,
    calculatedVariables,
    externalVariables,
    collectedVariablesByQuestion
  ) {
    this.props.setActiveQuestionnaire(questionnaire);
    this.props.setActiveComponents(components);
    this.props.setActiveCodeLists(codeLists);
    this.props.setActiveVariables({
      activeCalculatedVariablesById: calculatedVariables,
      activeExternalVariablesById: externalVariables,
      collectedVariableByQuestion: collectedVariablesByQuestion,
    });
  }

  render() {
    return (
      <div id={COMPONENT_ID}>
        <QuestionnaireNav />
        {/*<QuestionnaireListComponents />*/}
        <GenericInput />
      </div>
    );
  }
}

export default PageQuestionnaire;
