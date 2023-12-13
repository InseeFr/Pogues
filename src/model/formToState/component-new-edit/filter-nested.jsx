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

  return filterNested.reduce((acc, cv) => {
    const state = formToState(cv);
    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

// export function storeToForm(currentStore) {
//   const calculatedVariables = [];

//   Object.keys(currentStore).forEach(key => {
//     const {
//       id,
//       label,
//       name,
//       formula,
//       type,
//       scope,
//       [type]: simpleState,
//     } = currentStore[key];
//     calculatedVariables.push({
//       id,
//       label,
//       name,
//       formula,
//       type,
//       scope,
//       [type]: {
//         ...simpleState,
//       },
//     });
//   });

//   return {
//     ...defaultForm,
//     calculatedVariables,
//   };
// }

// const Factory = (currentStore = {}) => {
//   return {
//     formToStore: form => {
//       if (form) currentStore = formToStore(form);
//       return currentStore;
//     },
//     storeToForm: () => {
//       return storeToForm(currentStore);
//     },
//     getStore: () => {
//       return currentStore;
//     },
//   };
// };

// export default Factory;
