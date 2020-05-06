import { uuid } from 'utils/utils';

export function remoteToState(remote = []) {
  return remote.reduce((acc, loop) => {
      const {
        Name: nameLoop,
        MemberReference: [
          initialMember,
          finalMember,
        ],
        IterableReference: basedOn,
        Filter: filter,
        Maximum: maximum
      } = loop;
      const id = loop.id || uuid();
      return {
        ...acc,
        [id]: {
          id,
          nameLoop,
          initialMember,
          finalMember,
          basedOn,
          filter,
          maximum,
        },
      };
  }, {});
}

export function stateToRemote(state) {
  console.log('Object.keys(state)', state)
  return Object.keys(state).map(key => {
    const {
      id,
      nameLoop,
      maximum,
      basedOn,
      filter,    
      initialMember,
      finalMember,
      addButtonLibel,
      type,
    } = state[key];

    return { 
      id,
      type: "DynamicIterationType",
      Name: nameLoop,
      MemberReference: [
        initialMember,
        finalMember,
      ],
      IterableReference: basedOn,
      Filter: filter,
      Maximum: maximum
  };
  });
}
