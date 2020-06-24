import React from 'react';
import { shallow } from 'enzyme';

import InputFilterWithCriteria from './input-filter-with-criteria';

import { WIDGET_INPUT_FILTER_WITH_CRITERIA } from 'constants/dom-constants';
import { fakeEvent, noop } from 'utils/test/test-utils';

const {
  SEARCH_INPUT_CLASS,
  BUTTON_SEARCH_CLASS,
} = WIDGET_INPUT_FILTER_WITH_CRITERIA;

describe('<InputFilterWithCriteria />', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'This is a fake label',
      typeItem: 'FAKE_TYPE_ITEM',
      loadSearchResult: noop,
      criteriaValues: {},
      loadOnInit: true,
    };
  });

  test('Should render the search input', () => {
    const wrapper = shallow(<InputFilterWithCriteria {...props} />);

    expect(wrapper.find(`input.${SEARCH_INPUT_CLASS}`)).toHaveLength(1);
  });

  test('Should render the search action button', () => {
    const wrapper = shallow(<InputFilterWithCriteria {...props} />);

    expect(wrapper.find(`button.${BUTTON_SEARCH_CLASS}`)).toHaveLength(1);
  });

  // test('Should call "search" at the beggining only if the prop "loadOnInit" is true', () => {
  //   const spySearchFirst = jest.fn();
  //   const spySearchSecond = jest.fn();

  //   props.loadSearchResult = spySearchFirst;
  //   shallow(<InputFilterWithCriteria {...props} />);

  //   expect(spySearchFirst).toHaveBeenCalled();

  //   props = { ...props, loadOnInit: false, loadSearchResult: spySearchSecond };
  //   shallow(<InputFilterWithCriteria {...props} />);

  //   expect(spySearchSecond).not.toHaveBeenCalled();
  // });

  test.skip('Should call "search" with the text existing in the "input" action when the "button" is clicked', () => {
    // @TODO: Find a way to test refs

    const spySearch = jest.fn();
    const text = 'This is a fake test';

    props.loadSearchResult = spySearch;
    const wrapper = shallow(<InputFilterWithCriteria {...props} />);
    wrapper
      .find(`input.${SEARCH_INPUT_CLASS}`)
      .get(0)
      .ref(<input value={text} />);

    wrapper.find(`button.${BUTTON_SEARCH_CLASS}`).simulate('click', fakeEvent);

    expect(spySearch).toHaveBeenCalledWith(
      props.typeItem,
      props.criteriaValues,
      text,
    );
  });
});
