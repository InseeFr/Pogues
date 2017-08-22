export const controlsFormDefault = {
  label: '',
  condition: '',
  message: '',
  type: 'INFO',
  during_collect: false,
  post_collect: false,
  controls: [],
};

export const controlsFormNew = {
  label: '',
  condition: '',
  message: '',
  type: 'INFO',
  during_collect: false,
  post_collect: false,
  controls: [
    {
      label: 'First control label',
      condition: 'First control condition',
      message: 'First control message',
      type: 'INFO',
      during_collect: false,
      post_collect: false,
    },
    {
      label: 'Second control label',
      condition: 'Second control condition',
      message: 'Second control message',
      type: 'INFO',
      during_collect: false,
      post_collect: false,
    },
  ],
};

export const controlsFormUpdate = {
  label: '',
  condition: '',
  message: '',
  type: 'INFO',
  during_collect: false,
  post_collect: false,
  controls: [
    {
      id: 'FIRST_CONTROL',
      label: 'First control label',
      condition: 'First control condition',
      message: 'First control message',
      type: 'INFO',
      during_collect: false,
      post_collect: false,
    },
    {
      id: 'SECOND_CONTROL',
      label: 'Second control label',
      condition: 'Second control condition',
      message: 'Second control message',
      type: 'INFO',
      during_collect: false,
      post_collect: false,
    },
  ],
};

export const controlsState = {
  FIRST_CONTROL: {
    id: 'FIRST_CONTROL',
    label: 'First control label',
    condition: 'First control condition',
    message: 'First control message',
    type: 'INFO',
    during_collect: false,
    post_collect: false,
  },
  SECOND_CONTROL: {
    id: 'SECOND_CONTROL',
    label: 'Second control label',
    condition: 'Second control condition',
    message: 'Second control message',
    type: 'INFO',
    during_collect: false,
    post_collect: false,
  },
};

export const controlsModel = [
  {
    id: 'FIRST_CONTROL',
    Description: 'First control label',
    Expression: 'First control condition',
    FailMessage: 'First control message',
    type: 'INFO',
    during_collect: false,
    post_collect: false,
  },
  {
    id: 'SECOND_CONTROL',
    Description: 'Second control label',
    Expression: 'Second control condition',
    FailMessage: 'Second control message',
    type: 'INFO',
    during_collect: false,
    post_collect: false,
  },
];
