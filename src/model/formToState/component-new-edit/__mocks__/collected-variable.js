import { VARIABLES_TYPES } from '../../../../constants/pogues-constants';

const { COLLECTED } = VARIABLES_TYPES;

export const collectedVariablesFormDefault = {
  label: '',
  name: '',
  collectedVariables: [],
};

export const collectedVariablesFormNew = {
  label: '',
  name: '',
  collectedVariables: [
    {
      label: 'This is the first label',
      name: 'Q1_THISISTHE',
    },
    {
      label: 'This is the second label',
      name: 'Q2_THISISTHE',
    },
  ],
};

export const collectedVariablesFormUpdate = {
  label: '',
  name: '',
  collectedVariables: [
    {
      id: 'FIRSTID',
      label: 'This is the first label',
      name: 'Q1_THISISTHE',
    },
    {
      id: 'SECONID',
      label: 'This is the second label',
      name: 'Q2_THISISTHE',
    },
  ],
};

export const collectedVariablesStore = {
  FIRSTID: {
    id: 'FIRSTID',
    label: 'This is the first label',
    name: 'Q1_THISISTHE',
  },
  SECONID: {
    id: 'SECONID',
    label: 'This is the second label',
    name: 'Q2_THISISTHE',
  },
};

export const collectedVariablesModel = [
  {
    id: 'FIRSTID',
    Label: 'This is the first label',
    Name: 'Q1_THISISTHE',
    type: COLLECTED,
  },
  {
    id: 'SECONID',
    Label: 'This is the second label',
    Name: 'Q2_THISISTHE',
    type: COLLECTED,
  },
];
