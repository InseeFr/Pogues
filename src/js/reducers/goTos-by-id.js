//TODO needs to know how to handle ifTrue defined as a name (not a
//component id) when a component with its name is then created : to we need to
//map ifTrue to this component and set `ifTrueIsAName` to false, or keep
//`ifTrueIsAName` rto `true`. With first option, if the component is then
//renamed, the mapping will be kept ; with second option, it will be lost since
//the goTo will point towards a component with `ifTrue` as a name.
const emptyGoTo = {
  description: '',
  expression: '',
  ifTrue: null, //ifTrue can be used to store a label, which can be an empty
  //string, so we use `null` as a default value
  ifTrueIsAName: false
};

const actionsHndlrs = {
  CREATE_GOTO: createGoTo,
  REMOVE_GOTO: removeGoTo,
  EDIT_GOTO: editGoTo,
  REMOVE_COMPONENT: removeComponent,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
};

export default function(state = {}, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionsHndlrs[type];
  return hndlr ? hndlr(state, payload, action) : state;
}

function removeGoTo(goTos, { id }) {
  // eslint-disable-next-line
  const { [id]: toRemove, ...toKeep } = goTos;
  return toKeep;
}

function createGoTo(goTos, { id }) {
  return {
    ...goTos,
    [id]: {
      id,
      ...emptyGoTo
    }
  };
}

function editGoTo(goTos, { id, update }) {
  return {
    ...goTos,
    [id]: {
      ...goTos[id],
      ...update
    }
  };
}
// When we remove a component, we need to remove the target of each goTo pointing
// towards it
function removeComponent(goTos, { id: cmpntId }) {
  const update = Object.keys(goTos).reduce(
    (update, id) => {
      const goTo = goTos[id];
      const { ifTrue, ifTrueIsAName } = goTo;
      if (!ifTrueIsAName && ifTrue === cmpntId) {
        //remove the target
        update[id] = {
          ...goTo,
          ifTrue: null
        };
      }
      return update;
    },
    {}
  );
  if (Object.keys(update).length > 0) {
    //avoid unecessary copies if nothing changed
    return {
      ...goTos,
      ...update
    };
  } else
    return goTos;
}

function loadQuestionnaireSuccess(goTos, { update: { goToById } }) {
  return goToById;
}
