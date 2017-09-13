import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import { getQuestionLabelFromRaw } from 'utils/model/model-utils';
import { nameFromLabel } from 'utils/name-utils';
import { uuid } from 'utils/data-utils';
import ResponseFormatTransformerFactory from './response-format';
import DeclarationTransformerFactory from './declaration';
import ControlTransformerFactory from './control';
import RedirectionTransformerFactory from './redirection';
import CalculatedVariableTransformerFactory from './calculated-variable';
import ExternalVariableTransformerFactory from './external-variable';
import CollectedVariableTransformerFactory from './collected-variable';
import { markdownToHtml } from 'layout/forms/controls/rich-textarea';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

function transformationFormToState(form, currentState, codesListsStore) {
  const { id, type, parent, weight, children, responseFormat: responseFormatState } = currentState;
  const { name, label, responseFormat, declarations, controls, redirections, collectedVariables } = form;

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
      initialState: responseFormatState,
      codesListsStore,
    }).formToState(responseFormat);
    state.collectedVariables = CollectedVariableTransformerFactory().formToComponentState(collectedVariables);
  } else {
    state.label = label;
  }

  return state;
}

function transformationModelToState(model, codesListsStore = {}) {
  const {
    id,
    questionType,
    genericName,
    Name: name,
    Label: [label],
    Declaration: declarations,
    GoTo: redirections,
    Controls: controls,
    Response: responses,
    ResponseStructure: responseStructure,
    Child: children,
    parent,
    weight,
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
  state.redirections = RedirectionTransformerFactory().modelToState(redirections);

  if (genericName) {
    state.label = label;
    if (genericName === QUESTIONNAIRE) {
      state.type = QUESTIONNAIRE;
    } else if (genericName === 'MODULE') {
      state.type = SEQUENCE;
    } else if (genericName === 'SUBMODULE') {
      state.type = SUBSEQUENCE;
    }
  } else {
    const dimensions = responseStructure ? responseStructure.Dimension : [];
    const responseFormat = ResponseFormatTransformerFactory({
      codesListsStore,
    }).modelToState(questionType, responses, dimensions);
    const collectedVariables = CollectedVariableTransformerFactory().modelToComponentState(responses);
    state.type = QUESTION;
    state.label = getQuestionLabelFromRaw(label);
    state.rawLabel = label;
    state.htmlLabel = markdownToHtml(state.label);
    state.responseFormat = responseFormat;
    state.collectedVariables = collectedVariables;
  }

  return state;
}

function transformationModelToStore(model, questionnaireId, codesListsStore = {}) {
  function getComponentsFromNested(children, parent, acc) {
    let weight = 0;
    children.forEach(child => {
      acc[child.id] = transformationModelToState({ ...child, weight, parent }, codesListsStore);
      weight += 1;
      if (child.Child) getComponentsFromNested(child.Child, child.id, acc);
      return acc;
    });

    return acc;
  }

  return getComponentsFromNested(model, questionnaireId, {});
}

function transformationStateToForm(
  currentState,
  codesListsStore,
  calculatedVariablesStore,
  externalVariablesStore,
  collectedVariablesStore
) {
  const { label, name, type, responseFormat, declarations, controls, redirections, collectedVariables } = currentState;
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
    form.externalVariables = ExternalVariableTransformerFactory({
      initialStore: externalVariablesStore,
    }).storeToForm();
    form.collectedVariables = CollectedVariableTransformerFactory({
      collectedVariablesStore,
    }).stateComponentToForm(collectedVariables);
  }

  return form;
}

function transformationStateToModel(state, store, codesListsStore = {}, depth = 1) {
  const {
    id,
    name: Name,
    label,
    type,
    children,
    responseFormat,
    declarations,
    controls,
    redirections,
    collectedVariables,
  } = state;

  let model = {
    id,
    depth,
    Name,
    Label: [label],
    Declaration: DeclarationTransformerFactory({ initialState: declarations }).stateToModel(),
    Control: ControlTransformerFactory({ initialState: controls }).stateToModel(),
    GoTo: RedirectionTransformerFactory({ initialState: redirections }).stateToModel(),
  };

  if (type === QUESTION) {
    model.type = QUESTION_TYPE_NAME;
    model.questionType = responseFormat.type;
    model = {
      ...model,
      ...ResponseFormatTransformerFactory({
        initialState: responseFormat,
        codesListsStore,
        collectedVariables,
      }).stateToModel(),
    };
  } else {
    model.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      model.genericName = 'QUESTIONNAIRE';
    } else if (type === SEQUENCE) {
      model.genericName = 'MODULE';
    } else {
      model.genericName = 'SUBMODULE';
    }
    model.Child = transformationStateChildrenToModel(children, store, codesListsStore, depth);
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

const ComponentTransformerFactory = (conf = {}) => {
  const {
    initialStore,
    questionnaireId,
    codesListsStore,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariablesStore,
    collectedVariableByQuestionStore,
  } = conf;

  let currentStore = initialStore || {};
  let currentState = {};

  return {
    formToState: (form, infos) => {
      const { id, parent, weight, type } = infos;
      const currentId = id || uuid();
      const state = {
        ...currentState,
        id: currentId,
        parent,
        weight,
        type,
      };

      currentState = transformationFormToState(form, state, codesListsStore);

      return currentState;
    },
    formToStore: (form, id) => {
      currentState = transformationFormToState(form, currentStore[id], codesListsStore);
      currentStore = {
        ...currentStore,
        [id]: currentState,
      };
      return currentStore;
    },
    modelToStore: model => {
      currentStore = {
        ...transformationModelToStore(model.Child, questionnaireId, codesListsStore),
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

      return transformationStateToForm(
        state,
        codesListsStore,
        calculatedVariablesStore,
        externalVariablesStore,
        collectedVariablesStore || {}
      );
    },
    storeToModel: () => {
      return currentStore[questionnaireId].children.map(key => {
        return transformationStateToModel(
          currentStore[key],
          currentStore,
          codesListsStore,
          collectedVariableByQuestionStore
        );
      });
    },
  };
};

export default ComponentTransformerFactory;
