import React from 'react';
import { describe, expect, test } from 'vitest';

import SearchCodesLists from './search-codes-lists';

import { WIDGET_SEARCH_CODES_LISTS } from '../../constants/dom-constants';

const { SEARCH_RESULTS_CLASS } = WIDGET_SEARCH_CODES_LISTS;

import {
  StatisticalContextCriteria,
  defaultProps as StatisticalContextCriteriaDefaultProps,
} from '../statistical-context-criteria';

import {
  InputFilterWithCriteria,
  defaultProps as InputFilterWithCriteriaDefaultProps,
} from '../input-filter-with-criteria';

import { SearchResults } from '../search-results';

import {
  DEFAULT_FORM_NAME,
  SEARCH_CRITERIAS,
  SEARCH_RESULTS_COLUMNS,
  TYPES_ITEMS,
} from '../../constants/pogues-constants';

import Dictionary from '../../utils/dictionary/dictionary';
import { noop } from '../../utils/test/test-utils';
import { OidcProvider } from '../../utils/oidc';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer, reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

const rootReducer = combineReducers({
  form: formReducer,
  // add other reducers here if needed
});

const store = createStore(rootReducer);

const WrappedSearchCodesLists = reduxForm({
  form: 'testForm', // you can use any form name
})(SearchCodesLists);

describe('<SearchCodesLists />', () => {
  const path = 'FAKE_SELECTOR_PATH';

  // test('Should render a StatisticalContextCriteria component with the corresponding props', () => {
  //   const expectedProps = {
  //     ...StatisticalContextCriteriaDefaultProps,
  //     formName: DEFAULT_FORM_NAME,
  //     path,
  //     showOperations: false,
  //     showCampaigns: false,
  //     horizontal: true,
  //   };

  //   render(
  //     <Provider store={store}>
  //       <WrappedSearchCodesLists path={path} />
  //     </Provider>,
  //   );
  // });

  // test('Should render a InputFilterWithCriteria component with the corresponding props', () => {
  //   const expectedProps = {
  //     ...InputFilterWithCriteriaDefaultProps,
  //     label: Dictionary.searchInputCodesListsLabel,
  //     formName: DEFAULT_FORM_NAME,
  //     path,
  //     typeItem: TYPES_ITEMS.CODES_LIST,
  //     criterias: SEARCH_CRITERIAS.CODES_LIST,
  //   };
  //   const wrapper = shallow(<SearchCodesLists path={path} />);

  //   expect(wrapper.find(InputFilterWithCriteria).props()).toEqual(
  //     expectedProps,
  //   );
  // });
  // test.skip('Should render a SearchResults component with the corresponding props', () => {
  //   const expectedProps = {
  //     label: Dictionary.searchInputCodesListsLabel,
  //     className: SEARCH_RESULTS_CLASS,
  //     noValuesMessage: Dictionary.codesListsNoResults,
  //     columns: SEARCH_RESULTS_COLUMNS.CODES_LIST,
  //     actions: [
  //       {
  //         dictionary: 'searchResultActionReuse',
  //         action: noop,
  //         icon: 'glyphicon-eye-open',
  //         iconOnly: true,
  //       },
  //     ],
  //   };
  //   const wrapper = shallow(<SearchCodesLists path={path} />);

  //   expect(wrapper.find(SearchResults).props()).toEqual(expectedProps);
  // });
});
