export const declarationsFormNew = {
  declarationType: 'INSTRUCTION',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  declarations: [
    {
      declarationType: 'INSTRUCTION',
      label: 'This is the first declaration',
      position: 'AFTER_QUESTION_TEXT',
    },
    {
      declarationType: 'INSTRUCTION',
      label: 'This is the second declaration',
      position: 'AFTER_QUESTION_TEXT',
    },
  ],
};

export const declarationsFormUpdate = {
  declarationType: 'INSTRUCTION',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  declarations: [
    {
      id: 'FIRST_DECLARATION',
      declarationType: 'INSTRUCTION',
      label: 'This is the first declaration',
      position: 'AFTER_QUESTION_TEXT',
    },
    {
      id: 'SECOND_DECLARATION',
      declarationType: 'INSTRUCTION',
      label: 'This is the second declaration',
      position: 'AFTER_QUESTION_TEXT',
    },
  ],
};

export const declarationsState = {
  FIRST_DECLARATION: {
    id: 'FIRST_DECLARATION',
    declarationType: 'INSTRUCTION',
    label: 'This is the first declaration',
    position: 'AFTER_QUESTION_TEXT',
  },
  SECOND_DECLARATION: {
    id: 'SECOND_DECLARATION',
    declarationType: 'INSTRUCTION',
    label: 'This is the second declaration',
    position: 'AFTER_QUESTION_TEXT',
  },
};

export const declarationsModel = [
  {
    id: 'FIRST_DECLARATION',
    declarationType: 'INSTRUCTION',
    text: 'This is the first declaration',
    position: 'AFTER_QUESTION_TEXT',
  },
  {
    id: 'SECOND_DECLARATION',
    declarationType: 'INSTRUCTION',
    text: 'This is the second declaration',
    position: 'AFTER_QUESTION_TEXT',
  },
];
