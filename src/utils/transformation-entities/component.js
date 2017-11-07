import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import { getQuestionLabelFromRaw } from 'utils/model/model-utils';
import { nameFromLabel } from 'utils/name-utils';
import { uuid } from 'utils/utils';
import ResponseFormatTransformerFactory from './response-format';
import DeclarationTransformerFactory from './declaration';
import ControlTransformerFactory from './control';
import RedirectionTransformerFactory from './redirection';
import CalculatedVariableTransformerFactory from './calculated-variable';
import ExternalVariableTransformerFactory from './external-variable';
import CollectedVariableTransformerFactory from './collected-variable';
import { markdownToHtml } from 'layout/forms/controls/rich-textarea';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

function transformationFormToState(form, currentState, ResponseFormat) {
  const { name, label, responseFormat, declarations, controls, redirections, collectedVariables } = form;

  const state = {
    ...currentState,
    name: name || nameFromLabel(label),
  };

  if (currentState.type !== QUESTIONNAIRE) {
    state.declarations = DeclarationTransformerFactory().formToState(declarations);
    state.controls = ControlTransformerFactory().formToState(controls);
    state.redirections = RedirectionTransformerFactory().formToState(redirections);
  }

  if (currentState.type === QUESTION) {
    state.label = label;
    state.rawLabel = label;
    state.htmlLabel = markdownToHtml(state.label);
    state.responseFormat = ResponseFormat.formToState(responseFormat);
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
    Control: controls,
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
  ResponseFormat,
  calculatedVariablesStore,
  externalVariablesStore,
  collectedVariablesStore
) {
  const { label, name, type, declarations, controls, redirections, collectedVariables } = currentState;
  const form = {
    label: label || '',
    name: name || '',
    declarations: DeclarationTransformerFactory({ initialState: declarations }).stateToForm(),
    controls: ControlTransformerFactory({ initialState: controls }).stateToForm(),
    redirections: RedirectionTransformerFactory({ initialState: redirections }).stateToForm(),
  };

  if (type === QUESTION) {
    form.responseFormat = ResponseFormat.stateToForm();
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
    model.Child = transformationStateChildrenToModel(children, store, codesListsStore, depth); // eslint-disable-line no-use-before-define
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
    initialState,
    initialStore,
    questionnaireId,
    codesListsStore,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariablesStore,
    collectedVariableByQuestionStore,
  } = conf;

  let currentState;
  let currentStore = initialStore || {};
  let ResponseFormat;

  if (!questionnaireId) {
    if (initialState.id && currentStore[initialState.id]) {
      currentState = currentStore[initialState.id];
    } else {
      currentState = {
        id: uuid(),
        type: initialState.type,
        parent: initialState.parent || '',
        weight: initialState.weight || 0,
        children: initialState.children || [],
        label: initialState.label || '',
        name: initialState.name || '',
      };
    }

    ResponseFormat = ResponseFormatTransformerFactory({
      initialState: currentState.responseFormat,
      codesListsStore,
    });
  }

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentState, ResponseFormat);

      return currentState;
    },
    formToStore: (form, id) => {
      currentState = transformationFormToState(form, currentState, ResponseFormat);
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
    stateToForm: () => {
      return transformationStateToForm(
        currentState,
        ResponseFormat,
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
    modelToQuestionnaireComponent: () => {
      // @TODO: Find a better way
      currentState = transformationFormToState(currentState, currentState, ResponseFormat);
      return currentState;
    },
    getCodesListStore: () => {
      return ResponseFormat.getCodesListStore();
    },
  };
};

export default ComponentTransformerFactory;
