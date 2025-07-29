import { shallow } from 'enzyme';
import { describe, expect, test } from 'vitest';

import { WIDGET_SEARCH_RESULTS } from '../../constants/dom-constants';
import { noop } from '../../utils/test/test-utils';
import SearchResult from './search-results';

const { HEADER_CLASS, COLUMN_CLASS, ROW_CLASS, ROW_EMPTY_CLASS } =
  WIDGET_SEARCH_RESULTS;

describe('<SearchResults /', () => {
  const columns = [
    { dictionary: 'FAKE_COLUMN_01', key: 'FAKE_COLUMN_01' },
    { dictionary: 'FAKE_COLUMN_02', key: 'FAKE_COLUMN_02' },
    { dictionary: 'FAKE_COLUMN_02', key: 'FAKE_COLUMN_03' },
  ];
  const noValuesMessage = 'This is a fake no values message';
  const actions = [
    { dictionary: 'FAKE_COLUMN_01', action: noop },
    { dictionary: 'FAKE_COLUMN_02', action: noop },
  ];
  const props = {
    id: 'FAKE_ID',
    columns,
    noValuesMessage,
    actions,
  };

  test('Should render as many headers as elements in the prop "columns" and actions', () => {
    const wrapper = shallow(<SearchResult {...props} />);

    expect(wrapper.find(`.${HEADER_CLASS} .${COLUMN_CLASS}`)).toHaveLength(
      columns.length + 1,
    );
  });

  test('Should render as many rows as values', () => {
    const values = [
      {
        FAKE_COLUMN_01: 'FAKE_01_01',
        FAKE_COLUMN_02: 'FAKE_01_02',
        FAKE_COLUMN_03: 'FAKE_01_03',
      },
      {
        FAKE_COLUMN_01: 'FAKE_02_01',
        FAKE_COLUMN_02: 'FAKE_02_02',
        FAKE_COLUMN_03: 'FAKE_02_03',
      },
      {
        FAKE_COLUMN_01: 'FAKE_03_01',
        FAKE_COLUMN_02: 'FAKE_03_02',
        FAKE_COLUMN_03: 'FAKE_03_03',
      },
    ];
    const customProps = {
      ...props,
      values,
    };
    const wrapper = shallow(<SearchResult {...customProps} />);

    expect(wrapper.find(`.${ROW_CLASS}`)).toHaveLength(values.length + 1);
  });

  test('Should render an empty row with a "no values" message if the number of values is 0', () => {
    const wrapper = shallow(<SearchResult {...props} />);

    expect(wrapper.find(`.${ROW_CLASS}`)).toHaveLength(2);
    expect(wrapper.find(`.${ROW_EMPTY_CLASS}`).text()).toBe(noValuesMessage);
  });
});
