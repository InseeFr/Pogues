import React from 'react';

import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import CodesLists from './codes-lists';
import CodesListsCodes from './codes-lists-codes';

// We need to mock these imports, otherwise the import of VTL-Editor crashes the tests

vi.mock('../../../forms/controls/control-with-suggestions', () => {
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
});
