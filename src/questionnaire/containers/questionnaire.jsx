import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dragComponent } from 'actions/component';

import { setSelectedComponentId } from 'actions/app-state';
import { removeComponent, duplicateComponent } from 'actions/component';
import { removeQuestionnaire } from 'actions/questionnaire';

import Questionnaire from 'questionnaire/components/questionnaire';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  components: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
});

const mapDispatchToProps = {
  setSelectedComponentId,
  dragComponent,
  removeComponent,
  duplicateComponent,
  removeQuestionnaire,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
    dragComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    duplicateComponent: PropTypes.func.isRequired,
    removeQuestionnaire: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }
  componentWillMount() {
    this.props.setSelectedComponentId('');
  }

  render() {
    const {
      questionnaire,
      components,
      selectedComponentId,
      dragComponent,
      removeComponent,
      duplicateComponent,
      removeQuestionnaire,
    } = this.props;

    if (!questionnaire.id) return <span className="fa fa-spinner fa-pulse fa-2x" />;
    return (
      <Questionnaire
        questionnaire={questionnaire}
        components={components}
        setSelectedComponentId={this.props.setSelectedComponentId}
        selectedComponentId={selectedComponentId}
        moveComponent={dragComponent}
        removeComponent={removeComponent}
        duplicateComponent={duplicateComponent}
        removeQuestionnaire={removeQuestionnaire}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
