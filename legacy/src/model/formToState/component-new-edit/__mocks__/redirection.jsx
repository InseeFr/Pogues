export const redirectionsFormDefault = {
  label: '',
  condition: '',
  cible: '',
  redirections: [],
};

export const redirectionsFormNew = {
  label: '',
  condition: '',
  cible: '',
  redirections: [
    {
      label: 'First redirection label',
      condition: 'First redirection condition',
      cible: 'First redirection cible',
    },
    {
      label: 'Second redirection label',
      condition: 'Second redirection condition',
      cible: 'Second redirection cible',
    },
  ],
};

export const redirectionsFormUpdate = {
  label: '',
  condition: '',
  cible: '',
  redirections: [
    {
      id: 'FIRST_REDIRECTION',
      label: 'First redirection label',
      condition: 'First redirection condition',
      cible: 'First redirection cible',
    },
    {
      id: 'SECOND_REDIRECTION',
      label: 'Second redirection label',
      condition: 'Second redirection condition',
      cible: 'Second redirection cible',
    },
  ],
};

export const redirectionsState = {
  FIRST_REDIRECTION: {
    id: 'FIRST_REDIRECTION',
    label: 'First redirection label',
    condition: 'First redirection condition',
    cible: 'First redirection cible',
  },
  SECOND_REDIRECTION: {
    id: 'SECOND_REDIRECTION',
    label: 'Second redirection label',
    condition: 'Second redirection condition',
    cible: 'Second redirection cible',
  },
};

export const redirectionsModel = [
  {
    id: 'FIRST_REDIRECTION',
    label: 'First redirection label',
    Expression: 'First redirection condition',
    IfTrue: 'First redirection cible',
  },
  {
    id: 'SECOND_REDIRECTION',
    label: 'Second redirection label',
    Expression: 'Second redirection condition',
    IfTrue: 'Second redirection cible',
  },
];
