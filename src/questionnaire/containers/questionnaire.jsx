import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dragComponent } from 'actions/component';

import { setSelectedComponentId } from 'actions/app-state';

import Questionnaire from 'questionnaire/components/questionnaire';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  components: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
});

const mapDispatchToProps = {
  setSelectedComponentId,
  dragComponent,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
    dragComponent: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setSelectedComponentId('');
  }

  render() {
    const { questionnaire, components, selectedComponentId, dragComponent } = this.props;

    if (!questionnaire.id) return <span className="fa fa-spinner fa-pulse fa-2x" />;

    return (
      <Questionnaire
        questionnaire={questionnaire}
        components={components}
        setSelectedComponentId={this.props.setSelectedComponentId}
        selectedComponentId={selectedComponentId}
        moveComponent={dragComponent}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
