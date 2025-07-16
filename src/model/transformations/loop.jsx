import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { uuid } from '../../utils/utils';

const { LOOP } = COMPONENT_TYPE;

export function remoteToState(remote, parent) {
  const {
    Name: name,
    MemberReference: memberReference,
    IterableReference: basedOn,
    Filter: filter,
    Label: addButtonLibel,
    isFixedLength,
    maximum,
    minimum,
    size,
    shouldSplitIterations,
  } = remote;

  const id = remote.id || uuid();
  let initialMember = '';
  let finalMember = '';

  if (memberReference && memberReference.length === 1) {
    [initialMember] = memberReference;
    [finalMember] = memberReference;
  }

  if (memberReference && memberReference.length > 1) {
    [initialMember, finalMember] = memberReference;
  }
  return {
    id,
    name: name,
    nameLoop: name,
    initialMember,
    finalMember,
    basedOn,
    filter,
    isFixedLength,
    maximum,
    minimum,
    size,
    shouldSplitIterations,
    addButtonLibel,
    type: 'LOOP',
    TargetMode: [],
    parent: parent,
  };
}

export function stateToRemote(store) {
  return Object.values(store)
    .filter((element) => element.type === LOOP)
    .map((component) => {
      const {
        id,
        nameLoop,
        isFixedLength,
        maximum,
        minimum,
        size,
        shouldSplitIterations,
        basedOn,
        filter,
        initialMember,
        finalMember,
        addButtonLibel,
      } = component;

      const response = {
        id,
        Name: nameLoop,
        MemberReference: [initialMember, finalMember],
        type: 'DynamicIterationType',
      };
      if (basedOn) {
        response.IterableReference = basedOn;
      } else {
        response.isFixedLength = isFixedLength;
        response.Step = '1';

        if (isFixedLength) {
          response.size = size;
          response.shouldSplitIterations = shouldSplitIterations;
        } else {
          response.maximum = maximum;
          response.minimum = minimum;
          if (addButtonLibel) {
            response.Label = addButtonLibel;
          }
        }
      }

      if (filter) {
        response.Filter = filter;
      }
      return response;
    });
}
