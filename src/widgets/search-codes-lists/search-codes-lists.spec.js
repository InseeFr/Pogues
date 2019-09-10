import React from 'react';
import { shallow } from 'enzyme';

import SearchCodesLists from './search-codes-lists';

import { WIDGET_SEARCH_CODES_LISTS } from 'constants/dom-constants';

const { SEARCH_RESULTS_CLASS } = WIDGET_SEARCH_CODES_LISTS;

import {
  StatisticalContextCriteria,
  defaultProps as StatisticalContextCriteriaDefaultProps,
} from 'widgets/statistical-context-criteria';

import {
  InputFilterWithCriteria,
  defaultProps as InputFilterWithCriteriaDefaultProps,
} from 'widgets/input-filter-with-criteria';

import { SearchResults } from 'widgets/search-results';

import {
  DEFAULT_FORM_NAME,
  TYPES_ITEMS,
  SEARCH_CRITERIAS,
  SEARCH_RESULTS_COLUMNS,
} from 'constants/pogues-constants';

import Dictionary from 'utils/dictionary/dictionary';
import { noop } from 'utils/test/test-utils';

describe('<SearchCodesLists />', () => {
  const path = 'FAKE_SELECTOR_PATH';

  test('Should render a StatisticalContextCriteria component with the corresponding props', () => {
    const expectedProps = {
      ...StatisticalContextCriteriaDefaultProps,
      formName: DEFAULT_FORM_NAME,
      path,
      showOperations: false,
      showCampaigns: false,
      horizontal: true,
    };
    const wrapper = shallow(<SearchCodesLists path={path} />);

    expect(wrapper.find(StatisticalContextCriteria).props()).toEqual(
      expectedProps,
    );
  });

  test('Should render a InputFilterWithCriteria component with the corresponding props', () => {
    const expectedProps = {
      ...InputFilterWithCriteriaDefaultProps,
      label: Dictionary.searchInputCodesListsLabel,
      formName: DEFAULT_FORM_NAME,
      path,
      typeItem: TYPES_ITEMS.CODES_LIST,
      criterias: SEARCH_CRITERIAS.CODES_LIST,
    };
    const wrapper = shallow(<SearchCodesLists path={path} />);

    expect(wrapper.find(InputFilterWithCriteria).props()).toEqual(
      expectedProps,
    );
  });

  test.skip('Should render a SearchResults component with the corresponding props', () => {
    const expectedProps = {
      label: Dictionary.searchInputCodesListsLabel,
      className: SEARCH_RESULTS_CLASS,
      noValuesMessage: Dictionary.codesListsNoResults,
      columns: SEARCH_RESULTS_COLUMNS.CODES_LIST,
      actions: [
        {
          dictionary: 'searchResultActionReuse',
          action: noop,
          icon: 'glyphicon-eye-open',
          iconOnly: true,
        },
      ],
    };
    const wrapper = shallow(<SearchCodesLists path={path} />);

    expect(wrapper.find(SearchResults).props()).toEqual(expectedProps);
  });
});
