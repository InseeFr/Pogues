import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setSelectedComponent } from 'actions/app-state';
import Questionnaire from 'questionnary/components/questionnaire';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  components: state.appState.activeComponentsById,
  selectedComponent: state.appState.selectedComponent,
});

const mapDispatchToProps = {
  setSelectedComponent,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    selectedComponent: PropTypes.string.isRequired,
    setSelectedComponent: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setSelectedComponent('');
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
