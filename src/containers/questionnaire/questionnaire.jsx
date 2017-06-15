import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setSelectedComponent, setActiveQuestionnaire, setActiveComponents } from 'actions/app-state';
import Questionnaire from 'components/questionnaire/questionnaire';

const mapStateToProps = (state, { questionnaireId }) => ({
  questionnaire: state.questionnaireById[questionnaireId],
  components: state.componentByQuestionnaire[questionnaireId],
  selectedComponent: state.appState.selectedComponent,
});

const mapDispatchToProps = {
  setActiveQuestionnaire,
  setActiveComponents,
  setSelectedComponent,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    selectedComponent: PropTypes.string.isRequired,
    setActiveQuestionnaire: PropTypes.func.isRequired,
    setActiveComponents: PropTypes.func.isRequired,
    setSelectedComponent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    questionnaire: {},
    components: {},
  };

  componentWillMount() {
    this.setActive(this.props.questionnaire, this.props.components);
    this.props.setSelectedComponent('');
  }

  componentWillUpdate(nextProps) {
    const nextQuestionnaireId = nextProps.questionnaire.id;
    if (nextQuestionnaireId && nextQuestionnaireId !== this.props.questionnaire.id) {
      this.setActive(nextProps.questionnaire, nextProps.components);
    }
  }

  setActive(questionnaire, components) {
    this.props.setActiveQuestionnaire(questionnaire);
    this.props.setActiveComponents(components);
  }

  render() {
    const { questionnaire, components, selectedComponent } = this.props;

    if (!questionnaire.id) return <span className="fa fa-spinner fa-pulse fa-2x" />;

    return (
      <Questionnaire
        questionnaire={questionnaire}
        components={components}
        setSelectedComponent={this.props.setSelectedComponent}
        selectedComponent={selectedComponent}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
