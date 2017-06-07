import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadQuestionnaireIfNeeded } from 'actions/questionnaire';
import { setActiveComponent } from 'actions/app-state';
import Questionnaire from 'components/questionnaire/questionnaire';

const mapStateToProps = (state, { id }) => {
  const questionnaireState = state.appState.questionnaireById[id];
  const activeComponent = state.appState.activeComponent;
  const questionnaire = state.questionnaireById[id];
  const loaded = questionnaireState.loaded ? questionnaireState.loaded : false;
  let components = {};

  if (loaded) {
    components = state.appState.componentListByQuestionnaire[id];
  }

  const props = {
    id,
    loaded,
    questionnaire,
    components,
    activeComponent,
  };

  return props;
};

const mapDispatchToProps = {
  loadQuestionnaireIfNeeded,
  setActiveComponent,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    questionnaire: PropTypes.object,
    components: PropTypes.object,
    activeComponent: PropTypes.string,
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    setActiveComponent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    questionnaire: {},
    components: {},
    activeComponent: undefined,
  };

  componentWillMount() {
    this.props.loadQuestionnaireIfNeeded(this.props.id);
    if (this.props.activeComponent !== '') this.props.setActiveComponent('');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.props.loadQuestionnaireIfNeeded(nextProps.id);
  }

  render() {
    if (!this.props.loaded) return <span className="fa fa-spinner fa-pulse fa-2x" />;
    return (
      <Questionnaire
        questionnaire={this.props.questionnaire}
        components={this.props.components}
        setActiveComponent={this.props.setActiveComponent}
        activeComponent={this.props.activeComponent}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
