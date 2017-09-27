import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dragComponent, removeComponent, duplicateComponent } from 'actions/component';
import { setSelectedComponentId, loadStatisticalContext } from 'actions/app-state';
import { loadCampaignsIfNeeded } from 'actions/metadata';
import { removeQuestionnaire } from 'actions/questionnaire';
import Questionnaire from 'questionnaire/components/questionnaire';

function getErrorsByComponent(errorsByCode) {
  const errorsByComponent = {};

  Object.keys(errorsByCode)
    .filter(key => errorsByCode[key].errors.length > 0)
    .forEach(key => {
      const { type, code, dictionary, errors } = errorsByCode[key];

      errors.forEach(componentError => {
        const { id, params } = componentError;
        if (!errorsByComponent[id]) errorsByComponent[id] = { id, errors: [] };
        errorsByComponent[id].errors.push({
          type,
          code,
          dictionary,
          params,
        });
      });
    });

  return errorsByComponent;
}

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  components: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
  errorsByCode: state.appState.errorsByCode,
});

const mapDispatchToProps = {
  setSelectedComponentId,
  dragComponent,
  removeComponent,
  duplicateComponent,
  removeQuestionnaire,
  loadStatisticalContext,
  loadCampaignsIfNeeded,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
    dragComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    loadStatisticalContext: PropTypes.func.isRequired,
    loadCampaignsIfNeeded: PropTypes.func.isRequired,
    duplicateComponent: PropTypes.func.isRequired,
    removeQuestionnaire: PropTypes.func.isRequired,
    errorsByCode: PropTypes.object,
  };
  static defaultProps = {
    errorsByCode: {},
  };

  componentWillMount() {
    this.props.setSelectedComponentId('');
  }

  render() {
    const { questionnaire, components, selectedComponentId, errorsByCode } = this.props;
    const errorsByComponent = getErrorsByComponent(errorsByCode);

    if (!questionnaire.id) return <span className="fa fa-spinner fa-pulse fa-2x" />;
    return (
      <Questionnaire
        questionnaire={questionnaire}
        components={components}
        setSelectedComponentId={this.props.setSelectedComponentId}
        selectedComponentId={selectedComponentId}
        moveComponent={this.props.dragComponent}
        removeComponent={this.props.removeComponent}
        duplicateComponent={this.props.duplicateComponent}
        removeQuestionnaire={this.props.removeQuestionnaire}
        errorsByComponent={errorsByComponent}
        loadStatisticalContext={this.props.loadStatisticalContext}
        loadCampaignsIfNeeded={this.props.loadCampaignsIfNeeded}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
