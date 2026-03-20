import { uuid } from '../../../utils/utils';

export const defaultState = {
  id: null,
  condition: '',
  name: '',
  description: '',
  finalMember: '',
  initialMember: '',
};

export const defaultForm = {
  condition: '',
  name: '',
  description: '',
  initialMember: '',
  finalMember: '',
};

export function formToState(form) {
  const { condition, name, description, finalMember, initialMember } = form;
  const id = form.id || uuid();

  return {
    id,
    condition,
    name,
    description,
    finalMember,
    initialMember,
  };
}

export function formToStore(form) {
  const { filterNested } = form;

  const res = {};
  for (const cv of filterNested) {
    const state = formToState(cv);
    res[state.id] = state;
  }
  return res;
}
