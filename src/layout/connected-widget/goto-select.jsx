import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GotoSelect from './components/goto-select';
import { isSequence, isSubSequence, getTargets } from 'utils/component/component-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import {
  getNewQuestionPlaceholder,
  getNewSequencePlaceholder,
  getNewSubsequencePlaceholder,
} from 'utils/model/generic-input-utils';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

function getListTargets(
  components,
  componentType,
  selectedComponentId,
  componentParent,
  componentWeight,
  isNewComponent
) {
  const ids = getTargets(
    components,
    componentType,
    selectedComponentId,
    componentParent,
    componentWeight,
    isNewComponent
  );
  return ids.map(id => {
    const component = components[id];
    const parent = components[component.parent];
    let padding = '-';

    if (isSequence(parent)) {
      padding = `${padding}-`;
    } else if (isSubSequence(parent)) {
      padding = `${padding}--`;
    }

    return {
      value: id,
      label: `${padding} ${component.label}`,
    };
  });
}

function getParentAndWeight(components, isNewComponent, componentType, selectedComponentId, questionnaireId) {
  let data = {};
  if (isNewComponent) {
    if (componentType === QUESTION) {
      data = getNewQuestionPlaceholder(components, components[selectedComponentId]);
    } else if (componentType === SEQUENCE) {
      data = getNewSequencePlaceholder(components, questionnaireId, components[selectedComponentId]);
    } else {
      data = getNewSubsequencePlaceholder(components, components[selectedComponentId]);
    }
  } else {
    data.parent = components[selectedComponentId].parent;
    data.weight = components[selectedComponentId].weight;
  }
  return data;
}

export function mapStateToProps(state, { componentType, isNewComponent }) {
  const questionnaireId = state.appState.activeQuestionnaire.id;
  const components = state.appState.activeComponentsById;
  const selectedComponentId = state.appState.selectedComponentId;
  const { weight, parent } = getParentAndWeight(
    components,
    isNewComponent,
    componentType,
    selectedComponentId,
    questionnaireId
  );

  return {
    targets: getListTargets(components, componentType, selectedComponentId, parent, weight, isNewComponent),
  };
}

function GotoSelectContainer({ targets }) {
  return <GotoSelect targets={targets} />;
}

GotoSelectContainer.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(GotoSelectContainer);
