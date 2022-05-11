import React from 'react';
import { shallow } from 'enzyme';

import CodesLists from './codes-lists';
import CodesListsCodes from './codes-lists-codes';

import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';

const { PANEL_CLASS } = WIDGET_CODES_LISTS;
const { NEW, REF, QUEST } = CODES_LIST_INPUT_ENUM;

// We need to mock these imports, otherwise the import of VTL-Editor crashes the tests

jest.mock('forms/controls/control-with-suggestions', () => {
  return {
    __esModule: true,
    default: () => {
      // if you exporting component as default
      return <div />;
    },
  };
});

describe('<CodesList />', () => {
  const customPath = 'this.is.a.fake.path';

  test.skip('Should exists hidden fields with the codes list id and label', () => {
    const wrapper = shallow(<CodesLists path={customPath} />);
    expect(wrapper.find(`Field[name="${customPath}id"]`)).toHaveLength(1);
    expect(wrapper.find(`Field[name="${customPath}label"]`)).toHaveLength(1);
  });

  test.skip('Should render a CodesListsCodes component', () => {
    const wrapper = shallow(<CodesLists path={customPath} />);
    expect(wrapper.find('FieldArray').props()).toMatchObject({
      name: `${customPath}codes`,
      component: CodesListsCodes,
    });
  });

  test.skip('Should render a CodesListsPanelSelector component', () => {
    const wrapper = shallow(<CodesLists path={customPath} />);
    expect(wrapper.find('CodesListsPanelSelector')).toHaveLength(1);
  });

  test.skip(
    'Should render a panel to create a new codes list, to search in the codes lists referential and to select a ' +
      'codes list from the existing in the questionnaire',
    () => {
      const wrapper = shallow(<CodesLists path={customPath} />);
      expect(
        wrapper.find(`.${PANEL_CLASS}.${PANEL_CLASS}-${NEW}`),
      ).toHaveLength(1);
      expect(
        wrapper.find(`.${PANEL_CLASS}.${PANEL_CLASS}-${REF}`),
      ).toHaveLength(1);
      expect(
        wrapper.find(`.${PANEL_CLASS}.${PANEL_CLASS}-${QUEST}`),
      ).toHaveLength(1);
    },
  );
});
