import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { COMPONENT_TYPE } from 'constants/pogues-constants';
import Logger from 'utils/logger/logger';
import QuestionnaireContainer from './questionnaire';
import QuestionnaireNavContainer from './questionnaire-nav-container';
import GenericInputContainer from './generic-input';
import { loadQuestionnaireIfNeeded } from 'actions/questionnaire';
import { setActiveQuestionnaire, setActiveComponents, setActiveCodeLists, setActiveVariables } from 'actions/app-state';

const logger = new Logger('PageQuestionnaireContainer', 'Components');
const { QUESTION } = COMPONENT_TYPE;

function getCollectedVariablesByQuestionnaire(components = {}, collectedVariables = {}) {
  return Object.keys(components)
    .filter(key => components[key].type === QUESTION)
    .filter(key => components[key].collectedVariables.length > 0)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: components[key].collectedVariables.reduce((accInner, keyInner) => {
          return {
            ...accInner,
            [keyInner]: { ...collectedVariables[keyInner] },
          };
        }, {}),
      };
    }, {});
}

const mapStateToProps = (state, { params: { id } }) => ({
  questionnaire: state.questionnaireById[id],
  components: state.componentByQuestionnaire[id],
  codeLists: state.codeListByQuestionnaire[id],
  calculatedVariables: state.calculatedVariableByQuestionnaire[id],
  externalVariables: state.externalVariableByQuestionnaire[id],
  collectedVariablesByQuestion: getCollectedVariablesByQuestionnaire(
    state.componentByQuestionnaire[id],
    state.collectedVariableByQuestionnaire[id]
  ),
});

const mapDispatchToProps = {
  loadQuestionnaireIfNeeded,
  setActiveQuestionnaire,
  setActiveComponents,
  setActiveCodeLists,
  setActiveVariables,
};

class PageQuestionnaireContainer extends Component {
  static propTypes = {
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    setActiveQuestionnaire: PropTypes.func.isRequired,
    setActiveComponents: PropTypes.func.isRequired,
    setActiveCodeLists: PropTypes.func.isRequired,
    setActiveVariables: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    questionnaire: PropTypes.object,
    components: PropTypes.object,
    codeLists: PropTypes.object,
    calculatedVariables: PropTypes.object,
    externalVariables: PropTypes.object,
    collectedVariablesByQuestion: PropTypes.object,
  };

  static defaultProps = {
    questionnaire: {},
    components: {},
    codeLists: {},
    calculatedVariables: {},
    externalVariables: {},
    collectedVariablesByQuestion: {},
  };

  componentWillMount() {
    logger.debug('Rendering PageQuestionnaireContainer component');
    this.props.loadQuestionnaireIfNeeded(this.props.params.id);
    this.setActive(
      this.props.questionnaire,
      this.props.components,
      this.props.codeLists,
      this.props.calculatedVariables,
      this.props.externalVariables,
      this.props.collectedVariablesByQuestion
    );
  }
  componentWillUpdate(nextProps) {
    const nextQuestionnaireId = nextProps.questionnaire.id;
    if (nextQuestionnaireId && nextQuestionnaireId !== this.props.questionnaire.id) {
      this.setActive(
        nextProps.questionnaire,
        nextProps.components,
        nextProps.codeLists,
        nextProps.calculatedVariables,
        nextProps.externalVariables,
        nextProps.collectedVariablesByQuestion
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
      <div id="page-questionnaire">
        <QuestionnaireNavContainer />
        <QuestionnaireContainer />
        <GenericInputContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageQuestionnaireContainer);
