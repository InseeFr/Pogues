import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GotoSelect from './components/goto-select';
import { isSequence, isSubSequence } from 'utils/component/component-utils';

function getTargetsFromSequence(components, sequence) {
  return components[sequence.parent].children
    .filter(id => components[id].weight > sequence.weight)
    .reduce((acc, key) => [...acc, key, ...components[key].children.filter(id => isSubSequence(components[id]))], []);
}

function getTargetsFromComponent(components, component) {
  return components[component.parent].children.filter(
    id => isSubSequence(components[id]) && components[id].weight > component.weight
  );
}

function getTargets(components, selectedComponentId) {
  let ids = [];
  let currentComponent = components[selectedComponentId];

  if (isSequence(currentComponent)) {
    ids = currentComponent.children.filter(id => isSubSequence(components[id]));
  }

  do {
    if (!isSequence(currentComponent)) {
      ids = [...ids, ...getTargetsFromComponent(components, currentComponent)];
    } else {
      ids = [...ids, ...getTargetsFromSequence(components, currentComponent)];
    }

    currentComponent = components[currentComponent.parent];
  } while (currentComponent.parent !== '');

  return ids.map(id => {
    const component = components[id];
    const padding = isSubSequence(component) ? '--' : '-';
    return {
      value: id,
      label: `${padding} ${component.label}`,
    };
  });
}

export function mapStateToProps(state) {
  return {
    targets: getTargets(state.appState.activeComponentsById, state.appState.selectedComponentId),
  };
}

function GotoSelectContainer({ targets }) {
  return <GotoSelect targets={targets} />;
}

GotoSelectContainer.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(GotoSelectContainer);
