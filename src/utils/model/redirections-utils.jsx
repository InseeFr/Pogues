import { COMPONENT_TYPE } from '../../constants/pogues-constants';

const { QUESTIONNAIRE, SUBSEQUENCE } = COMPONENT_TYPE;

function getGotos(componentsStore, activeComponentsIds, components, depth = 0) {
  return components.reduce((acc, key) => {
    const componentId = componentsStore[key].id;
    return [
      ...acc,
      {
        value: componentId,
        depth,
        label: `${componentsStore[key].name} - ${componentsStore[
          key
        ].label.trim()}`,
        disabled: activeComponentsIds.indexOf(componentId) === -1,
      },
      ...getGotos(
        componentsStore,
        activeComponentsIds,
        componentsStore[key].children,
        depth + 1,
      ),
    ];
  }, []);
}

export function getListGotos(componentsStore, activeComponentsIds = []) {
  let listGotos = [];
  const rootKey = Object.keys(componentsStore).filter(
    key => componentsStore[key].type === QUESTIONNAIRE,
  )[0];

  if (rootKey) {
    listGotos = getGotos(
      componentsStore,
      activeComponentsIds,
      componentsStore[rootKey].children,
    );
  }

  return listGotos;
}

function getDescendants(componentsStore, component = {}) {
  return [
    ...(component.children || []),
    ...(component.children || []).reduce((acc, key) => {
      return [...acc, ...getDescendants(componentsStore, componentsStore[key])];
    }, []),
  ];
}

function getSiblingHeaviest(componentsStore, component) {
  const siblings = componentsStore[component.parent].children.filter(
    key =>
      key !== component.id && componentsStore[key].weight > component.weight,
  );

  return siblings.reduce((acc, key) => {
    return [
      ...acc,
      key,
      ...getDescendants(componentsStore, componentsStore[key]),
    ];
  }, []);
}

function getUnclesHeaviest(componentsStore, component) {
  const componentsIds = [];
  const parentId = component.parent;
  const grandFatherId = componentsStore[parentId].parent;
  if (grandFatherId) {
    const uncles = componentsStore[grandFatherId].children.filter(
      key =>
        key !== parentId &&
        componentsStore[key].weight > componentsStore[parentId].weight,
    );

    return uncles.reduce((acc, key) => {
      return [
        ...acc,
        key,
        ...getDescendants(componentsStore, componentsStore[key]),
      ];
    }, []);
  }

  return componentsIds;
}

function getGreatUnclesHeaviest(componentsStore, component) {
  const componentsIds = [];
  const grandFatherId = componentsStore[component.parent].parent;

  if (grandFatherId) {
    const greatGrandFatherId = componentsStore[grandFatherId].parent;

    if (greatGrandFatherId) {
      const greatUncles = componentsStore[greatGrandFatherId].children.filter(
        key =>
          key !== grandFatherId &&
          componentsStore[key].weight > componentsStore[grandFatherId].weight,
      );

      return greatUncles.reduce((acc, key) => {
        return [
          ...acc,
          key,
          ...getDescendants(componentsStore, componentsStore[key]),
        ];
      }, []);
    }
  }

  return componentsIds;
}

export function getOrderedComponents(componentsStore, rootComponentIds) {
  return rootComponentIds.reduce((acc, id) => {
    return [
      ...acc,
      id,
      ...getOrderedComponents(
        componentsStore,
        componentsStore[id].children.sort(
          (c1, c2) => componentsStore[c1].weight > componentsStore[c2].weight,
        ),
      ),
    ];
  }, []);
}

export function getComponentsTargetsByComponent(componentsStore, component) {
  const descendants = getDescendants(componentsStore, component);
  const siblingHeaviest = getSiblingHeaviest(componentsStore, component);
  const unclesHeaviest = getUnclesHeaviest(componentsStore, component);
  const greatUnclesHeaviest = getGreatUnclesHeaviest(
    componentsStore,
    component,
  );

  const targets = [
    ...descendants,
    ...siblingHeaviest,
    ...unclesHeaviest,
    ...greatUnclesHeaviest,
  ];
  targets.push('idendquest');

  return targets;
}

export function getComponentsTargetsByPosition(
  componentsStore,
  type,
  selectedComponentId,
) {
  let targets = [];

  if (selectedComponentId) {
    targets = getComponentsTargetsByComponent(
      componentsStore,
      componentsStore[selectedComponentId],
    );
  } else if (type === SUBSEQUENCE) {
    const rootId = Object.keys(componentsStore).filter(
      key => componentsStore[key].type === QUESTIONNAIRE,
    )[0];
    const heaviestSequenceId = componentsStore[rootId].children.reduce(
      (acc, key) => {
        return componentsStore[key].weight > componentsStore[acc].weight
          ? key
          : acc;
      },
    );

    targets = componentsStore[heaviestSequenceId].children
      .filter(key => componentsStore[key].type === SUBSEQUENCE)
      .reduce((acc, key) => {
        return [
          ...acc,
          key,
          ...getDescendants(componentsStore, componentsStore[key]),
        ];
      }, []);
  }

  return targets;
}
