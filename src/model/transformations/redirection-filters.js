import { uuid } from 'utils/utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { FILTRE } = COMPONENT_TYPE;

function getNextFlowControle(filterImbriquers, store) {
  const imbriquerControle = [];
  filterImbriquers.forEach(filter => {
    const {
      name,
      descriptionImbriquer,
      conditionImbriquer,
      initialMember,
      finalMember,
      filterImbriquer,
    } = store[filter];
    const redirection = {
      id: name,
      Description: descriptionImbriquer,
      Expression: conditionImbriquer,
      IfTrue: `${initialMember}-${finalMember}`,
    };
    if (filterImbriquer && filterImbriquer.length > 0) {
      redirection.Next = getNextFlowControle(filterImbriquer, store);
    }
    imbriquerControle.push(redirection);
  });
  return imbriquerControle;
}

export function stateToRemote(store) {
  return Object.values(store)
    .filter(element => element.type === FILTRE)
    .map(component => {
      const {
        name,
        imbriquers,
        description,
        filter,
        initialMember,
        finalMember,
      } = component;
      const redirection = {
        id: name,
        Description: description,
        Expression: filter,
        IfTrue: `${initialMember}-${finalMember}`,
      };
      if (imbriquers.length > 0) {
        redirection.Next = getNextFlowControle(imbriquers, store);
      }
      return redirection;
    });
}
