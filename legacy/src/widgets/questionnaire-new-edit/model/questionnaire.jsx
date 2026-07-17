import { uuid } from '../../../utils/utils';

export const defaultState = {
  owner: '',
  id: '',
  label: '',
  name: '',
  dataCollection: {},
  lastUpdatedDate: '',
  final: '',
  agency: '',
  TargetMode: [],
  dynamiqueSpecified: '',
  formulaSpecified: '',
  ComponentGroup: [],
  childQuestionnaireRef: [],
};

export function formToState(form) {
  const {
    label,
    name,
    dataCollection,
    TargetMode,
    dynamiqueSpecified,
    formulaSpecified,
  } = form;

  return {
    label,
    name,
    dataCollection,
    TargetMode: TargetMode.split(','),
    dynamiqueSpecified,
    formulaSpecified,
  };
}

export function stateToForm(currentState) {
  const {
    label,
    name,
    dataCollection,
    TargetMode,
    dynamiqueSpecified,
    formulaSpecified,
  } = currentState;

  return {
    label,
    name,
    dataCollection,
    TargetMode: TargetMode.join(),
    dynamiqueSpecified,
    formulaSpecified,
  };
}

const Factory = (initialState = {}) => {
  let currentState = {
    ...defaultState,
    ...initialState,
    id: initialState.id || uuid(),
  };
  return {
    formToState: (form) => {
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
