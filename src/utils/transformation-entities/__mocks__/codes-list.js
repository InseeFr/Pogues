export const fakeFirstCodesListId = 'FAKE_CODES_LIST_ID_1';

export const codesListFormDefault = {
  name: '',
  label: '',
  codes: [],
};

export const codesListFirstForm = {
  name: 'LISTE_TEST_1',
  label: 'liste_choix',
  codes: [
    {
      label: 'choix 1',
      value: 'CHOIX1',
      code: 'CHOIX1',
    },
    {
      label: 'choix 2',
      value: 'CHOIX2',
      code: 'CHOIX2',
    },
    {
      label: 'choix 3',
      value: 'CHOIX3',
      code: 'CHOIX3',
    },
    {
      label: 'choix 4',
      value: 'CHOIX4',
      code: 'CHOIX4',
    },
    {
      label: 'choix 5',
      value: 'CHOIX5',
      code: 'CHOIX5',
    },
  ],
};

export const codesListFirstFormUpdate = {
  id: fakeFirstCodesListId,
  name: 'LISTE_TEST_1',
  label: 'liste_choix',
  codes: [
    {
      id: 'CODE_CHOIX_1',
      label: 'choix 1',
      value: 'CHOIX1',
      code: 'CHOIX1',
    },
    {
      id: 'CODE_CHOIX_2',
      label: 'choix 2',
      value: 'CHOIX2',
      code: 'CHOIX2',
    },
    {
      id: 'CODE_CHOIX_3',
      label: 'choix 3',
      value: 'CHOIX3',
      code: 'CHOIX3',
    },
    {
      id: 'CODE_CHOIX_4',
      label: 'choix 4',
      value: 'CHOIX4',
      code: 'CHOIX4',
    },
    {
      id: 'CODE_CHOIX_5',
      label: 'choix 5',
      value: 'CHOIX5',
      code: 'CHOIX5',
    },
  ],
};

export const codesListFirstState = {
  id: fakeFirstCodesListId,
  name: 'LISTE_TEST_1',
  label: 'liste_choix',
  codes: {
    CODE_CHOIX_1: {
      id: 'CODE_CHOIX_1',
      label: 'choix 1',
      value: 'CHOIX1',
      code: 'CHOIX1',
    },
    CODE_CHOIX_2: {
      id: 'CODE_CHOIX_2',
      label: 'choix 2',
      value: 'CHOIX2',
      code: 'CHOIX2',
    },
    CODE_CHOIX_3: {
      id: 'CODE_CHOIX_3',
      label: 'choix 3',
      value: 'CHOIX3',
      code: 'CHOIX3',
    },
    CODE_CHOIX_4: {
      id: 'CODE_CHOIX_4',
      label: 'choix 4',
      value: 'CHOIX4',
      code: 'CHOIX4',
    },
    CODE_CHOIX_5: {
      id: 'CODE_CHOIX_5',
      label: 'choix 5',
      value: 'CHOIX5',
      code: 'CHOIX5',
    },
  },
};

export const codesListsStore = {
  [fakeFirstCodesListId]: codesListFirstState,
  FAKE_CODES_LIST_ID_2: {
    id: 'FAKE_CODES_LIST_ID_2',
    name: 'LISTE_TEST_2',
    label: 'Oui_Non',
    codes: {
      CODE_OUI: {
        id: 'CODE_OUI',
        label: 'Oui',
        value: 'OUI',
        code: 'OUI',
      },
      CODE_NON: {
        id: 'CODE_NON',
        label: 'Non',
        value: 'NON',
        code: 'NON',
      },
    },
  },
};

export const codesListsModel = [
  {
    id: fakeFirstCodesListId,
    name: 'LISTE_TEST_1',
    label: 'liste_choix',
    codes: [
      {
        id: 'CODE_CHOIX_1',
        label: 'choix 1',
        value: 'CHOIX1',
        code: 'CHOIX1',
      },
      {
        id: 'CODE_CHOIX_2',
        label: 'choix 2',
        value: 'CHOIX2',
        code: 'CHOIX2',
      },
      {
        id: 'CODE_CHOIX_3',
        label: 'choix 3',
        value: 'CHOIX3',
        code: 'CHOIX3',
      },
      {
        id: 'CODE_CHOIX_4',
        label: 'choix 4',
        value: 'CHOIX4',
        code: 'CHOIX4',
      },
      {
        id: 'CODE_CHOIX_5',
        label: 'choix 5',
        value: 'CHOIX5',
        code: 'CHOIX5',
      },
    ],
  },
  {
    id: 'FAKE_CODES_LIST_ID_2',
    name: 'LISTE_TEST_2',
    label: 'Oui_Non',
    codes: [
      {
        id: 'CODE_OUI',
        label: 'Oui',
        value: 'OUI',
        code: 'OUI',
      },
      {
        id: 'CODE_NON',
        label: 'Non',
        value: 'NON',
        code: 'NON',
      },
    ],
  },
];
