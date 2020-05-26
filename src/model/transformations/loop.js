import { uuid } from 'utils/utils';
import { element } from 'prop-types';

export function remoteToState(remote, parent) {
      const {
        Name: name,
        MemberReference: memberReference,
        IterableReference: basedOn,
        Filter: filter,
        Label: addButtonLibel,
        Maximum: maximum
      } = remote;

      const id = remote.id || uuid(); 
      let initialMember = "";
      let finalMember = "";

      if(memberReference && memberReference.length > 0) {
        initialMember = memberReference[0]
      }

      if(memberReference && memberReference.length > 1) {
        finalMember = memberReference[1]
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
          addButtonLibel,
          type: 'LOOP',
          TargetMode: [],
          pageBreak: false,
          parent: parent,
      };
}

export function stateToRemote(store) {
  return Object.values(store).filter(element => element.type === "LOOP").map(component => {
      const {
        id,
        name,
        nameLoop,
        maximum,
        basedOn,
        filter,    
        initialMember,
        finalMember,
        addButtonLibel,
        type,
      } = component;

      const memberReference = [];
      memberReference[0]= initialMember;
      memberReference[1]= finalMember;

      let response = {
        id,
        Name: nameLoop,
        MemberReference: memberReference,  
        type: "DynamicIterationType",
      };  
      if(maximum) {
        response.Maximum = maximum;
      }
      if(basedOn) {
        response.IterableReference = basedOn;
      }
      if(addButtonLibel) {
        response.Label = addButtonLibel;
      }
      if(filter) {
        response.Filter = filter;
      }
      return response;
    })
}
