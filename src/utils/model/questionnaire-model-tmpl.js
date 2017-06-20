import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export default {
  id: '',
  name: '',
  label: [],
  declarations: [],
  goTos: [],
  controls: [],
  genericName: QUESTIONNAIRE,
  children: [],
  depth: 0,
  type: SEQUENCE_TYPE_NAME,
  agency: 'fr.insee', // @TODO: This should not be constant,
  survey: {
    agency: 'fr.insee', // @TODO: Idem
    name: 'POPO', // @TODO: Idem,
    id: '',
  },
  componentGroups: [
    // @TODO: Idem
    {
      name: 'PAGE_1', // @TODO: Idem
      label: 'Components for page 1', // @TODO: Idem
      Member: [],
      id: '',
    },
  ],
  codeLists: {
    codeList: [],
    codeListSpecification: [],
  },
};
