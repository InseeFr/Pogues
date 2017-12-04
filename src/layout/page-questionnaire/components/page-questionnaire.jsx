import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { PAGE_QUESTIONNAIRE } from 'constants/dom-constants';
import { QuestionnaireListComponents } from 'layout/questionnaire-list-components';
import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { GenericInput } from 'layout/generic-input';

const { COMPONENT_ID } = PAGE_QUESTIONNAIRE;

// Prop types and default props

export const propTypes = {
  id: PropTypes.string.isRequired,
  loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
  loadStatisticalContext: PropTypes.func.isRequired,
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
  setActiveQuestionnaire: PropTypes.func.isRequired,
  setActiveComponents: PropTypes.func.isRequired,
  setActiveCodeLists: PropTypes.func.isRequired,
  setActiveVariables: PropTypes.func.isRequired,
  questionnaire: PropTypes.object,
  components: PropTypes.object,
  activeQuestionnaire: PropTypes.object,
  codeLists: PropTypes.object,
  calculatedVariables: PropTypes.object,
  externalVariables: PropTypes.object,
  collectedVariablesByQuestion: PropTypes.object,
  router: PropTypes.object.isRequired,
};

export const defaultProps = {
  questionnaire: {},
  activeQuestionnaire: {},
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

    if (questionnaire.id) {
      const idCampaign = questionnaire.campaigns[0];
      this.props.setActiveQuestionnaire(questionnaire);
      this.props.setActiveComponents(components);
      this.props.setActiveCodeLists(codeLists);
      this.props.setActiveVariables({
        activeCalculatedVariablesById: calculatedVariables,
        activeExternalVariablesById: externalVariables,
        collectedVariableByQuestion: collectedVariablesByQuestion,
      });
      this.props.loadStatisticalContext(idCampaign);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeQuestionnaire.id !== this.props.activeQuestionnaire.id) {
      if (nextProps.activeQuestionnaire.campaigns && nextProps.activeQuestionnaire.campaigns.length > 0) {
        const idCampaign = nextProps.activeQuestionnaire.campaigns[0];
        this.props.loadStatisticalContext(idCampaign);
      }
    }

    if (nextProps.activeQuestionnaire.operation !== this.props.activeQuestionnaire.operation) {
      this.props.loadCampaignsIfNeeded(nextProps.activeQuestionnaire.operation);
    }

    if (!isEqual(nextProps.questionnaire, this.props.questionnaire)) {
      this.props.setActiveQuestionnaire(nextProps.questionnaire);
    }

    if (!isEqual(nextProps.components, this.props.components)) {
      this.props.setActiveComponents(nextProps.components);
    }

    if (!isEqual(nextProps.codeLists, this.props.codeLists)) {
      this.props.setActiveCodeLists(nextProps.codeLists);
    }

    if (
      !isEqual(nextProps.calculatedVariables, this.props.calculatedVariables) ||
      !isEqual(nextProps.externalVariables, this.props.externalVariables) ||
      !isEqual(nextProps.collectedVariablesByQuestion, this.props.collectedVariablesByQuestion)
    ) {
      this.props.setActiveVariables({
        activeCalculatedVariablesById: nextProps.calculatedVariables,
        activeExternalVariablesById: nextProps.externalVariables,
        collectedVariableByQuestion: nextProps.collectedVariablesByQuestion,
      });
    }
  }

  render() {
    return (
      <div id={COMPONENT_ID}>
        <QuestionnaireNav />
        <QuestionnaireListComponents navigate={this.props.router.push} />
        <GenericInput />
      </div>
    );
  }
}

export default PageQuestionnaire;
