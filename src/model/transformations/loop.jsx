import { uuid } from '../../utils/utils';

export function remoteToState(remote, parent) {
  const {
    Name: name,
    MemberReference: memberReference,
    IterableReference: basedOn,
    Filter: filter,
    Label: addButtonLibel,
    Maximum: maximum,
    Minimum: minimum,
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
    maximum,
    minimum,
    addButtonLibel,
    type: 'LOOP',
    TargetMode: [],
    parent: parent,
  };
}

export function stateToRemote(store) {
  return Object.values(store)
    .filter(element => element.type === 'LOOP')
    .map(component => {
      const {
        id,
        nameLoop,
        maximum,
        minimum,
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
      if (maximum) {
        response.Maximum = maximum;
        response.Step = '1';
        response.Minimum = minimum;
      }
      if (basedOn) {
        response.IterableReference = basedOn;
      }
      if (addButtonLibel) {
        response.Label = addButtonLibel;
      }
      if (filter) {
        response.Filter = filter;
      }
      return response;
    });
}
