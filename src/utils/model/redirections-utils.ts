import { COMPONENT_TYPE } from '../../constants/pogues-constants';

const { QUESTIONNAIRE, SUBSEQUENCE } = COMPONENT_TYPE;

type Component = {
  id?: string;
  name?: string;
  parent?: string;
  weight?: number;
  children?: string[];
  label?: string;
  type?: string;
};

type ComponentsStore = {
  [key: string]: Component;
};

/** Compute components ids that are children of the provided component. */
function getDescendants(
  componentsStore: ComponentsStore,
  component: Component = {},
): string[] {
  return [
    ...(component.children || []),
    ...(component.children || []).reduce((acc: string[], key: string) => {
      return [...acc, ...getDescendants(componentsStore, componentsStore[key])];
    }, []),
  ];
}

function getSiblingHeaviest(
  componentsStore: ComponentsStore,
  component: Component,
): string[] {
  const siblings = componentsStore[component.parent!].children!.filter(
    (key) =>
      key !== component.id && componentsStore[key].weight! > component.weight!,
  );

  return siblings.reduce((acc: string[], key: string) => {
    return [
      ...acc,
      key,
      ...getDescendants(componentsStore, componentsStore[key]),
    ];
  }, []);
}

function getUnclesHeaviest(
  componentsStore: ComponentsStore,
  component: Component,
): string[] {
  const componentsIds: string[] = [];
  const parentId = component.parent;
  const grandFatherId = parentId ? componentsStore[parentId].parent : undefined;
  if (grandFatherId) {
    const uncles = componentsStore[grandFatherId].children!.filter(
      (key) =>
        key !== parentId &&
        componentsStore[key].weight! > componentsStore[parentId!].weight!,
    );

    return uncles.reduce((acc: string[], key: string) => {
      return [
        ...acc,
        key,
        ...getDescendants(componentsStore, componentsStore[key]),
      ];
    }, []);
  }

  return componentsIds;
}

function getGreatUnclesHeaviest(
  componentsStore: ComponentsStore,
  component: Component,
): string[] {
  const componentsIds: string[] = [];

  const parentId = component.parent;
  const grandFatherId = parentId ? componentsStore[parentId].parent : undefined;

  if (grandFatherId) {
    const greatGrandFatherId = componentsStore[grandFatherId].parent;

    if (greatGrandFatherId) {
      const greatUncles = componentsStore[greatGrandFatherId].children!.filter(
        (key) =>
          key !== grandFatherId &&
          componentsStore[key].weight! > componentsStore[grandFatherId].weight!,
      );

      return greatUncles.reduce((acc: string[], key: string) => {
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

/** Return a list of component ids. */
export function getComponentsTargetsByComponent(
  componentsStore: ComponentsStore,
  component: Component,
): string[] {
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

/** Return a list of component ids. */
export function getComponentsTargetsByPosition(
  componentsStore: ComponentsStore,
  type: string,
  selectedComponentId?: string,
): string[] {
  if (selectedComponentId) {
    const res = getComponentsTargetsByComponent(
      componentsStore,
      componentsStore[selectedComponentId],
    );
    return res;
  }

  if (type !== SUBSEQUENCE) {
    return [];
  }

  const rootId = Object.keys(componentsStore).filter(
    (key) => componentsStore[key].type === QUESTIONNAIRE,
  )[0];
  if (!componentsStore[rootId].children) {
    return [];
  }

  const heaviestSequenceId = componentsStore[rootId].children.reduce(
    (acc, key) => {
      return componentsStore[key].weight! > componentsStore[acc].weight!
        ? key
        : acc;
    },
  );

  const res = componentsStore[heaviestSequenceId]
    .children!.filter(
      (key: string) => componentsStore[key].type === SUBSEQUENCE,
    )
    .reduce((acc: string[], key: string) => {
      return [
        ...acc,
        key,
        ...getDescendants(componentsStore, componentsStore[key]),
      ];
    }, []);

  return res || [];
}
