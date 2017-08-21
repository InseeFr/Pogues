import _ from 'lodash';

import {
  COMPONENT_TYPE,
  SEQUENCE_TYPE_NAME,
  QUESTION_TYPE_NAME,
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
} from 'constants/pogues-constants';
import { getQuestionLabelFromRaw } from 'utils/model/model-utils';
import { nameFromLabel } from 'utils/name-utils';
import { uuid } from 'utils/data-utils';
import ResponseFormatTransformerFactory from './response-format';
import DeclarationTransformerFactory from './declaration';
import ControlTransformerFactory from './control';
import RedirectionTransformerFactory from './redirection';
import CalculatedVariableTransformerFactory from './calculated-variable';
import { markdownToHtml } from 'layout/forms/controls/rich-textarea';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;
const { SINGLE_CHOICE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function transformationFormToState(form, currentState, currentCodesListsIdsStore) {
  const { id, type, parent, weight, children } = currentState;
  const { name, label, responseFormat, declarations, controls, redirections } = form;

  const state = {
    id,
    type,
    name: name || nameFromLabel(label),
    parent: parent || '',
    weight: weight || 0,
    children: children || [],
  };

  if (type !== QUESTIONNAIRE) {
    state.declarations = DeclarationTransformerFactory().formToState(declarations);
    state.controls = ControlTransformerFactory().formToState(controls);
    state.redirections = RedirectionTransformerFactory().formToState(redirections);
  }

  if (type === QUESTION) {
    state.label = label;
    state.rawLabel = label;
    state.htmlLabel = markdownToHtml(state.label);
    state.responseFormat = ResponseFormatTransformerFactory({
      currentCodesListsIdsStore,
    }).formToState(responseFormat);
  } else {
    state.label = label;
  }

  return state;
}

function transformationModelToState(model, codesListsStore = {}) {
  const {
    id,
    type,
    depth,
    name,
    label: [label],
    parent,
    weight,
    children,
    questionType,
    responses,
    responseStructure,
    declarations,
    controls,
    redirections,
    goTos,
  } = model;

  const state = {
    id,
    name,
    parent: parent || '',
    weight: weight || 0,
    children: children ? children.map(child => child.id) : [],
  };

  state.declarations = DeclarationTransformerFactory().modelToState(declarations);
  state.controls = ControlTransformerFactory().modelToState(controls);
  state.redirections = RedirectionTransformerFactory().modelToState(redirections || goTos);

  if (type === SEQUENCE_TYPE_NAME) {
    state.label = label;
    if (depth === 0) {
      state.type = QUESTIONNAIRE;
    } else if (depth === 1) {
      state.type = SEQUENCE;
    } else {
      state.type = SUBSEQUENCE;
    }
  } else if (type === QUESTION_TYPE_NAME) {
    const dimensions = responseStructure ? responseStructure.dimensions : [];
    state.type = QUESTION;
    state.label = getQuestionLabelFromRaw(label);
    state.rawLabel = label;
    state.htmlLabel = markdownToHtml(state.label);
    state.responseFormat = ResponseFormatTransformerFactory({
      codesListsStore,
    }).modelToState(questionType, responses, dimensions);
  }

  return state;
}

function transformationModelToStore(model, questionnaireId, codesListsStore = {}) {
  function getComponentsFromNested(children, parent, acc) {
    let weight = 0;
    children.forEach(child => {
      acc[child.id] = transformationModelToState({ ...child, weight, parent }, codesListsStore);
      weight += 1;
      if (child.children) getComponentsFromNested(child.children, child.id, acc);
      return acc;
    });

    return acc;
  }

  return getComponentsFromNested(model, questionnaireId, {});
}

function transformationStateToForm(currentState, codesListsStore, calculatedVariablesStore) {
  const { label, name, type, responseFormat, declarations, controls, redirections } = currentState;
  const form = {
    label: label || '',
    name: name || '',
    declarations: DeclarationTransformerFactory({ initialState: declarations }).stateToForm(),
    controls: ControlTransformerFactory({ initialState: controls }).stateToForm(),
    redirections: RedirectionTransformerFactory({ initialState: redirections }).stateToForm(),
  };

  if (type === QUESTION) {
    form.responseFormat = ResponseFormatTransformerFactory({
      initialState: responseFormat,
      codesListsStore,
    }).stateToForm();
    form.calculatedVariables = CalculatedVariableTransformerFactory({
      initialStore: calculatedVariablesStore,
    }).storeToForm();
  }

  return form;
}

function transformationStateToModel(state, store, codesListsStore = {}, depth = 1) {
  const { id, name, label, type, children, responseFormat, declarations, controls, redirections } = state;

  let model = {
    id,
    name,
    depth,
    label: [label],
    declarations: DeclarationTransformerFactory({ initialState: declarations }).stateToModel(),
    controls: ControlTransformerFactory({ initialState: controls }).stateToModel(),
    redirections: RedirectionTransformerFactory({ initialState: redirections }).stateToModel(),
  };

  if (type === QUESTION) {
    model.type = QUESTION_TYPE_NAME;
    model.questionType = responseFormat.type;
    // @TODO
    model = {
      ...model,
      ...ResponseFormatTransformerFactory({ initialState: responseFormat, codesListsStore }).stateToModel(),
    };
  } else {
    model.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      model.genericName = 'QUESTIONNAIRE';
    } else {
      model.genericName = 'MODULE';
    }
    model.children = transformationStateChildrenToModel(children, store, codesListsStore, depth);
  }

  return model;
}

function transformationStateChildrenToModel(children, store, codesListsStore, depth = 0) {
  return children
    .sort((keyA, keyB) => {
      if (store[keyA].weight < store[keyB].weight) return -1;
      if (store[keyA].weight > store[keyB].weight) return 1;
      return 0;
    })
    .map(key => {
      const newDepth = depth + 1;
      return transformationStateToModel(store[key], store, codesListsStore, newDepth);
    });
}

// function getCodesListsFromResponseFormat(responseFormat, codesListsTransformers) {
//   const codesListsStore = {};
//   const responseFormatName = responseFormat.type;
//   let codesListState;
//
//   if (responseFormatName === SINGLE_CHOICE) {
//     codesListState = codesListsTransformers[SINGLE_CHOICE].getState();
//     codesListsStore[codesListState.id] = codesListState;
//   } else if (responseFormatName === MULTIPLE_CHOICE) {
//     codesListState = codesListsTransformers[MULTIPLE_CHOICE][PRIMARY].getState();
//     codesListsStore[codesListState.id] = codesListState;
//     if (responseFormat[MULTIPLE_CHOICE][MEASURE].type === CODES_LIST) {
//       codesListState = codesListsTransformers[MULTIPLE_CHOICE][MEASURE][CODES_LIST].getState();
//       codesListsStore[codesListState.id] = codesListState;
//     }
//   }
//
//   return codesListsStore;
// }

const ComponentTransformerFactory = (conf = {}) => {
  const { initialStore, questionnaireId, codesListsStore, calculatedVariablesStore, currentCodesListsIdsStore } = conf;

  let currentStore = initialStore || {};
  let currentState;

  return {
    formToState: (form, infos) => {
      const { id, parent, weight, type } = infos;
      const currentId = id || uuid();

      currentState = transformationFormToState(
        form,
        { id: currentId, parent, weight, type },
        currentCodesListsIdsStore
      );

      return currentState;
    },
    formToStore: (form, id) => {
      currentState = transformationFormToState(form, currentStore[id], currentCodesListsIdsStore);
      currentStore = {
        ...currentStore,
        [id]: currentState,
      };
      return currentStore;
    },
    modelToStore: model => {
      currentStore = {
        ...transformationModelToStore(model.children, questionnaireId, codesListsStore),
        [questionnaireId]: transformationModelToState(model),
      };
      return currentStore;
    },
    stateToForm: infos => {
      const { id, type } = infos;
      let state;
      currentState = currentStore[id];

      if (!currentState) {
        state = { type };
      } else {
        state = currentState;
      }
      return transformationStateToForm(state, codesListsStore, calculatedVariablesStore);
    },
    storeToModel: () => {
      return currentStore[questionnaireId].children.map(key => {
        return transformationStateToModel(currentStore[key], currentStore, codesListsStore);
      });
    },
    // stateToCodesLists: () => {
    //   if (!currentState) return {};
    //   return getCodesListsFromResponseFormat(currentState.responseFormat, codesListsTransformers);
    // },
  };
};

export default ComponentTransformerFactory;
