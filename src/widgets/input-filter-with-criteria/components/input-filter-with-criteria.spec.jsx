import { render } from '@testing-library/react';
import { reducer as formReducer, reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import InputFilterWithCriteria from './input-filter-with-criteria';

import { WIDGET_INPUT_FILTER_WITH_CRITERIA } from '../../../constants/dom-constants';
import { noop } from '../../../utils/test/test-utils';

const store = createStore(combineReducers({ form: formReducer }));

const WrappedInputFilterWithCriteria = reduxForm({
  form: 'testForm', // you can use any form name
})(InputFilterWithCriteria);

const { SEARCH_INPUT_CLASS, BUTTON_SEARCH_CLASS } =
  WIDGET_INPUT_FILTER_WITH_CRITERIA;

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
    render(
      <Provider store={store}>
        <WrappedInputFilterWithCriteria {...props} />
      </Provider>,
    );

    const searchInput = document.querySelectorAll(
      `input.${SEARCH_INPUT_CLASS}`,
    );
    expect(searchInput.length).toBe(1);
  });

  test('Should render the search action button', () => {
    render(
      <Provider store={store}>
        <WrappedInputFilterWithCriteria {...props} />
      </Provider>,
    );
    const searchButton = document.querySelectorAll(
      `button.${BUTTON_SEARCH_CLASS}`,
    );
    expect(searchButton.length).toBe(1);
  });

  test('Should call "search" at the beggining only if the prop "loadOnInit" is true', () => {
    const spySearchFirst = vi.fn();
    const spySearchSecond = vi.fn();

    props.loadSearchResult = spySearchFirst;

    const { rerender } = render(
      <Provider store={store}>
        <WrappedInputFilterWithCriteria {...props} />
      </Provider>,
    );

    expect(props.loadSearchResult).toHaveBeenCalledOnce();

    props = { ...props, loadOnInit: false, loadSearchResult: spySearchSecond };

    // Clear mock call history before next rerender
    props.loadSearchResult.mockClear();

    rerender(
      <Provider store={store}>
        <WrappedInputFilterWithCriteria {...props} />
      </Provider>,
    );

    expect(props.loadSearchResult).not.toHaveBeenCalled();
  });

  // test.skip('Should call "search" with the text existing in the "input" action when the "button" is clicked', () => {
  //   // @TODO: Find a way to test refs

  //   const spySearch = vi.fn();
  //   const text = 'This is a fake test';

  //   props.loadSearchResult = spySearch;
  //   const wrapper = shallow(
  //     <OidcProvider>
  //       <InputFilterWithCriteria {...props} />
  //     </OidcProvider>,
  //   );
  //   wrapper
  //     .find(`input.${SEARCH_INPUT_CLASS}`)
  //     .get(0)
  //     .ref(<input value={text} />);

  //   wrapper.find(`button.${BUTTON_SEARCH_CLASS}`).simulate('click', fakeEvent);

  //   expect(spySearch).toHaveBeenCalledWith(
  //     props.typeItem,
  //     props.criteriaValues,
  //     text,
  //   );
  // });
});
