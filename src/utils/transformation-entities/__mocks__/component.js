import { declarationsFormDefault } from '../declaration';
import { controlsFormDefault } from '../control';
import { redirectionsFormDefault } from './redirection';
import { calculatedVariablesFormUpdate } from './calculated-variable';
import {
  responseFormatSimpleTextForm,
  responseFormatSimpleTextState,
  responseFormatSimpleTextModel,
} from './response-format';
import { SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';

export const fakeSequenceId = 'FAKE_SEQUENCE_ID_1';
export const fakeSubsequenceId = 'FAKE_SUBSEQUENCE_ID_1';
export const fakeQuestionId = 'FAKE_QUESTION_ID_1';

// QUESTIONNAIRE COMPONENT

export const questionnaireState = {
  id: 'ID_QUESTIONNAIRE_FAKE',
  name: 'THISISAQUE',
  parent: '',
  weight: 0,
  declarations: {},
  controls: {},
  redirections: {},
  type: 'QUESTIONNAIRE',
  label: 'This is a questionnaire',
  children: [],
};

// SEQUENCE

export const sequenceFormDefault = {
  name: '',
  label: '',
  declarations: declarationsFormDefault,
  controls: controlsFormDefault,
  redirections: redirectionsFormDefault,
};

export const sequenceForm = {
  name: 'SEQUENCE_1',
  label: 'Sequence 1',
  declarations: declarationsFormDefault,
  controls: controlsFormDefault,
  redirections: redirectionsFormDefault,
};

export const sequenceInfos = {
  id: fakeSequenceId,
  parent: 'ID_QUESTIONNAIRE_FAKE',
  weight: 0,
  type: 'SEQUENCE',
};

export const sequenceState = {
  id: fakeSequenceId,
  name: 'SEQUENCE_1',
  parent: 'ID_QUESTIONNAIRE_FAKE',
  weight: 0,
  declarations: {},
  controls: {},
  redirections: {},
  type: 'SEQUENCE',
  label: 'Sequence 1',
  children: [],
};

// SUBSEQUENCE

export const subsequenceForm = {
  name: 'SUBSEQUENCE_1',
  label: 'Subsequence 1',
  declarations: declarationsFormDefault,
  controls: controlsFormDefault,
  redirections: redirectionsFormDefault,
};

export const subsequenceInfos = {
  id: fakeSubsequenceId,
  parent: fakeSequenceId,
  weight: 0,
  type: 'SUBSEQUENCE',
};

export const subsequenceState = {
  id: fakeSubsequenceId,
  name: 'SUBSEQUENCE_1',
  parent: fakeSequenceId,
  weight: 0,
  declarations: {},
  controls: {},
  redirections: {},
  type: 'SUBSEQUENCE',
  label: 'Subsequence 1',
  children: [],
};

// QUESTION

export const questionFormDefault = {
  name: '',
  label: '',
  declarations: declarationsFormDefault,
  controls: controlsFormDefault,
  redirections: redirectionsFormDefault,
  calculatedVariables: calculatedVariablesFormUpdate,
  responseFormat: responseFormatSimpleTextForm,
};

export const questionForm = {
  name: 'QUESTION_1',
  label: 'Question 1',
  declarations: declarationsFormDefault,
  controls: controlsFormDefault,
  redirections: redirectionsFormDefault,
  calculatedVariables: calculatedVariablesFormUpdate,
  responseFormat: responseFormatSimpleTextForm,
};

export const questionInfos = {
  id: fakeQuestionId,
  parent: fakeSubsequenceId,
  weight: 0,
  type: 'QUESTION',
};

export const questionState = {
  id: fakeQuestionId,
  name: 'QUESTION_1',
  parent: fakeSubsequenceId,
  weight: 0,
  declarations: {},
  controls: {},
  redirections: {},
  type: 'QUESTION',
  label: 'Question 1',
  rawLabel: 'Question 1',
  responseFormat: responseFormatSimpleTextState,
  children: [],
};

// COMPONENTS STORE

export const componentsStore = {
  ID_QUESTIONNAIRE_FAKE: {
    ...questionnaireState,
    children: [fakeSequenceId],
  },
  [fakeSequenceId]: {
    ...sequenceState,
    children: [fakeSubsequenceId],
  },
  [fakeSubsequenceId]: {
    ...subsequenceState,
    children: [fakeQuestionId],
  },
  [fakeQuestionId]: {
    ...questionState,
  },
};

// COMPONENTS MODEL

export const componentsModel = [
  {
    id: fakeSequenceId,
    name: 'SEQUENCE_1',
    label: ['Sequence 1'],
    declarations: [],
    redirections: [],
    controls: [],
    genericName: 'MODULE',
    depth: 1,
    type: SEQUENCE_TYPE_NAME,
    children: [
      {
        id: fakeSubsequenceId,
        name: 'SUBSEQUENCE_1',
        label: ['Subsequence 1'],
        declarations: [],
        redirections: [],
        controls: [],
        genericName: 'MODULE',
        depth: 2,
        type: SEQUENCE_TYPE_NAME,
        children: [
          {
            id: fakeQuestionId,
            name: 'QUESTION_1',
            label: ['Question 1'],
            declarations: [],
            redirections: [],
            controls: [],
            depth: 3,
            type: QUESTION_TYPE_NAME,
            ...responseFormatSimpleTextModel,
          },
        ],
      },
    ],
  },
];
