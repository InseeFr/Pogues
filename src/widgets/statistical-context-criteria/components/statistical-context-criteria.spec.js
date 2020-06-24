import React from 'react';
import { shallow } from 'enzyme';

import StatisticalContextCriteria from './statistical-context-criteria';

import Select from 'forms/controls/select';
import ListCheckboxes from 'forms/controls/list-checkboxes';
import { noop } from 'utils/test/test-utils';

describe('<StatisticalContextCriteria />', () => {
  let props;
  beforeEach(() => {
    props = {
      series: [],
      operations: [],
      loadSeriesIfNeeded: noop,
      loadOperationsIfNeeded: noop,
      loadCampaignsIfNeeded: noop,
      change: noop,
      formName: 'FAKE_FORM_NAME',
      path: 'FAKE_PATH.',
      horizontal: false,
    };
  });

  describe('Props and render behaviour', () => {
    test('Should exist a field of type Select with name "serie" and another with name "operation"', () => {
      const wrapper = shallow(<StatisticalContextCriteria {...props} />);

      expect(wrapper.find('Field[name="serie"]').prop('component')).toBe(
        Select,
      );
      expect(wrapper.find('Field[name="operation"]').prop('component')).toBe(
        Select,
      );
    });

    test('Should exist a field with name "campaign" only when the prop "campaigns" is defined', () => {
      let wrapper = shallow(<StatisticalContextCriteria {...props} />);

      expect(wrapper.find('Field[name="campaigns"]')).toHaveLength(0);

      props.campaigns = [];
      wrapper = shallow(<StatisticalContextCriteria {...props} />);

      expect(wrapper.find('Field[name="campaigns"]')).toHaveLength(1);
    });

    test('Should allow to choose more than one campaign when the prop "multipleCampaign" is true', () => {
      props.campaigns = [];
      props.multipleCampaign = true;
      const wrapper = shallow(<StatisticalContextCriteria {...props} />);

      expect(wrapper.find('Field[name="campaigns"]').prop('component')).toBe(
        ListCheckboxes,
      );
    });

    test('Should render as many options as elements in the prop "series", "operations" and "campaigns"', () => {
      props.series = [{ value: 'FAKE_VALUE_01', label: 'FAKE_LABEL_01' }];
      props.operations = [
        { value: 'FAKE_VALUE_01', label: 'FAKE_LABEL_01' },
        { value: 'FAKE_VALUE_02', label: 'FAKE_LABEL_02' },
      ];
      props.campaigns = [
        { value: 'FAKE_VALUE_01', label: 'FAKE_LABEL_01' },
        { value: 'FAKE_VALUE_02', label: 'FAKE_LABEL_02' },
        { value: 'FAKE_VALUE_03', label: 'FAKE_LABEL_03' },
      ];
      const wrapper = shallow(<StatisticalContextCriteria {...props} />);

      expect(wrapper.find('Field[name="serie"] GenericOption')).toHaveLength(
        props.series.length,
      );
      expect(
        wrapper.find('Field[name="operation"] GenericOption'),
      ).toHaveLength(props.operations.length);
      expect(
        wrapper.find('Field[name="campaigns"] GenericOption'),
      ).toHaveLength(props.campaigns.length);
    });

    test('Should prevent operation and campaigns selection when the prop "SelectedSerie" is not defined', () => {
      props.campaigns = [];
      const wrapper = shallow(<StatisticalContextCriteria {...props} />);
      expect(
        wrapper.find('Field[name="operation"]').prop('disabled'),
      ).toBeTruthy();
      expect(
        wrapper.find('Field[name="campaigns"]').prop('disabled'),
      ).toBeTruthy();
    });

    test('Should prevent campaigns selection when the prop "SelectedOperation" is not defined', () => {
      props.campaigns = [];
      props.selectedSerie = 'FAKE_ID';
      const wrapper = shallow(<StatisticalContextCriteria {...props} />);

      expect(
        wrapper.find('Field[name="campaigns"]').prop('disabled'),
      ).toBeTruthy();
    });
  });

  // describe('Actions', () => {
  //   test('Should call "loadSeriesIfNeeded" at the beginning', () => {
  //     const spyLoadSeriesIfNeeded = jest.fn();
  //     props.loadSeriesIfNeeded = spyLoadSeriesIfNeeded;
  //     shallow(<StatisticalContextCriteria {...props} />);

  //     expect(spyLoadSeriesIfNeeded).toHaveBeenCalled();
  //   });

  //   test(
  //     'Should call "loadOperationsIfNeeded" at the beginning using the selected serie passed as prop and when the ' +
  //       'selected serie changes using the new value',
  //     () => {
  //       const spyLoadOperationsIfNeeded = jest.fn();
  //       const selectedSerieFirst = 'FAKE_ID_01';
  //       const selectedSerieSecond = 'FAKE_ID_02';

  //       props = {
  //         ...props,
  //         selectedSerie: selectedSerieFirst,
  //         loadOperationsIfNeeded: spyLoadOperationsIfNeeded,
  //       };

  //       const wrapper = shallow(<StatisticalContextCriteria {...props} />);

  //       expect(spyLoadOperationsIfNeeded).toHaveBeenCalledWith(
  //         selectedSerieFirst,
  //       );

  //       wrapper.setProps({ selectedSerie: selectedSerieSecond });

  //       expect(spyLoadOperationsIfNeeded).toHaveBeenCalledWith(
  //         selectedSerieSecond,
  //       );
  //     },
  //   );

  //   test(
  //     'Should call "loadCampaignsIfNeeded" at the beginning using the selected serie passed as prop and when the ' +
  //       'selected serie changes using the new value only if the prop campaigns exists',
  //     () => {
  //       const spyLoadCampaignsIfNeeded = jest.fn();
  //       const selectedOperationFirst = 'FAKE_ID_01';
  //       const selectedOperationSecond = 'FAKE_ID_02';

  //       props = {
  //         ...props,
  //         selectedOperation: selectedOperationFirst,
  //         loadCampaignsIfNeeded: spyLoadCampaignsIfNeeded,
  //       };

  //       // Campaigns doesn't exist

  //       let wrapper = shallow(<StatisticalContextCriteria {...props} />);

  //       expect(spyLoadCampaignsIfNeeded).not.toHaveBeenCalled();

  //       wrapper.setProps({ selectedOperation: selectedOperationSecond });

  //       expect(spyLoadCampaignsIfNeeded).not.toHaveBeenCalled();

  //       // Campaigns exists

  //       props.campaigns = [];

  //       wrapper = shallow(<StatisticalContextCriteria {...props} />);

  //       expect(spyLoadCampaignsIfNeeded).toHaveBeenCalledWith(
  //         selectedOperationFirst,
  //       );

  //       wrapper.setProps({ selectedOperation: selectedOperationSecond });

  //       expect(spyLoadCampaignsIfNeeded).toHaveBeenCalledWith(
  //         selectedOperationSecond,
  //       );
  //     },
  //   );

  //   test(
  //     'Should call "change" one time with the corresponding parameters when the selected serie changes and the prop ' +
  //       'campaign exists',
  //     () => {
  //       const spyChangeFirst = jest.fn();
  //       const spyChangeSecond = jest.fn();
  //       const selectedSerie = 'FAKE_ID_01';

  //       props.change = spyChangeFirst;

  //       // Campaigns doesn't exist

  //       let wrapper = shallow(<StatisticalContextCriteria {...props} />);
  //       wrapper.setProps({ selectedSerie });
  //       expect(spyChangeFirst).toHaveBeenCalledTimes(1);

  //       // Campaigns exists

  //       props = {
  //         ...props,
  //         campaigns: [],
  //         change: spyChangeSecond,
  //       };

  //       wrapper = shallow(<StatisticalContextCriteria {...props} />);
  //       wrapper.setProps({ selectedSerie });
  //       expect(spyChangeSecond).toHaveBeenCalledTimes(1);
  //     },
  //   );

  //   test(
  //     'Should call "change" one time with the corresponding parameters whent the selected operation changes and ' +
  //       'the prop campaign exists',
  //     () => {
  //       const spyChangeFirst = jest.fn();
  //       const spyChangeSecond = jest.fn();
  //       const selectedOperation = 'FAKE_ID_01';

  //       props.change = spyChangeFirst;

  //       // Campaigns doesn't exist

  //       let wrapper = shallow(<StatisticalContextCriteria {...props} />);
  //       wrapper.setProps({ selectedOperation });
  //       expect(spyChangeFirst).not.toHaveBeenCalled();

  //       // Campaigns exists

  //       props = {
  //         ...props,
  //         campaigns: [],
  //         change: spyChangeSecond,
  //       };

  //       wrapper = shallow(<StatisticalContextCriteria {...props} />);
  //       wrapper.setProps({ selectedOperation });
  //       expect(spyChangeSecond).toHaveBeenCalledTimes(1);
  //     },
  //   );
  // });
});
