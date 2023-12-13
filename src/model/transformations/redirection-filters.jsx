import { COMPONENT_TYPE } from '../../constants/pogues-constants';

const { FILTER, NESTEDFILTRE } = COMPONENT_TYPE;

function getFiltersState(filter, parent, type) {
  const {
    Description: description,
    Expression: expression,
    IfTrue: members,
    id,
    name,
  } = filter;
  const initialMember = members.substring(0, members.lastIndexOf('-'));
  const finalMember = members.substring(
    members.indexOf('-') + 1,
    members.length,
  );
  return {
    id,
    name: name || '',
    initialMember,
    finalMember,
    description,
    filter: expression,
    type: type,
    TargetMode: [],
    parent: parent,
    filterImbriquer: [],
  };
}
function remoteToStateNestedFilter(remote, parent, type, store) {
  const { Next: filters } = remote;
  const stateNestedFilter = getFiltersState(remote, parent, type);

  if (filters) {
    filters.forEach(filt => {
      const nested = remoteToStateNestedFilter(
        filt,
        parent,
        NESTEDFILTRE,
        store,
      );
      stateNestedFilter.filterImbriquer.push(nested.stateNestedFilter.id);
    });
  }

  const store1 = store;
  if (stateNestedFilter.id && !store1[stateNestedFilter.id]) {
    store1[stateNestedFilter.id] = stateNestedFilter;
  }

  return { stateNestedFilter, store1 };
}

export function remoteToState(remote, parent, store) {
  const stateFilter = getFiltersState(remote, parent, FILTER);
  const { Next: filters } = remote;

  if (filters) {
    filters.forEach(filt => {
      const nested = remoteToStateNestedFilter(
        filt,
        parent,
        NESTEDFILTRE,
        store,
      );
      stateFilter.filterImbriquer.push(nested.stateNestedFilter.id);
    });
  }
  if (stateFilter.id && !store[stateFilter.id]) {
    store[stateFilter.id] = stateFilter;
  }
  return store;
}

function getNextFlowControle(filterImbriquers, store) {
  const imbriquerControle = [];
  filterImbriquers.forEach(filtere => {
    const {
      id,
      name,
      description,
      filter,
      initialMember,
      finalMember,
      filterImbriquer,
    } = store[filtere];
    const redirection = {
      id,
      name,
      Description: description,
      Expression: filter,
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
    .filter(element => element.type === FILTER)
    .map(component => {
      const {
        id,
        filterImbriquer,
        description,
        filter,
        initialMember,
        finalMember,
      } = component;
      const redirection = {
        id,
        Description: description,
        Expression: filter,
        IfTrue: `${initialMember}-${finalMember}`,
      };
      if (filterImbriquer && filterImbriquer.length > 0) {
        redirection.Next = getNextFlowControle(filterImbriquer, store);
      }
      return redirection;
    });
}
