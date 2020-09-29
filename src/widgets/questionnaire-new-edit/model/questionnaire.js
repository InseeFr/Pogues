import { uuid } from 'utils/utils';

export const defaultState = {
  owner: '',
  id: '',
  label: '',
  name: '',
  serie: '',
  operation: '',
  campaigns: [],
  lastUpdatedDate: '',
  final: '',
  agency: '',
  TargetMode: [],
  dynamiqueSpecified: 'Redirections',
};

export function formToState(form) {
  const {
    label,
    name,
    serie,
    operation,
    campaigns,
    TargetMode,
    dynamiqueSpecified,
  } = form;

  return {
    label,
    name,
    serie,
    operation,
    campaigns: campaigns.split(','),
    TargetMode: TargetMode.split(','),
    dynamiqueSpecified,
  };
}

export function stateToForm(currentState) {
  const {
    label,
    name,
    serie,
    operation,
    campaigns,
    TargetMode,
    dynamiqueSpecified,
  } = currentState;

  // If serie and operation doesn't exist, we use campaigns to obtain them calling a service
  return {
    label,
    name,
    serie,
    operation,
    campaigns: campaigns.join(),
    TargetMode: TargetMode.join(),
    dynamiqueSpecified,
  };
}

const Factory = (initialState = {}) => {
  let currentState = {
    ...defaultState,
    ...initialState,
    id: initialState.id || uuid(),
  };
  return {
    formToState: form => {
      currentState = {
        ...currentState,
        ...formToState(form),
      };
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState);
    },
  };
};

export default Factory;
