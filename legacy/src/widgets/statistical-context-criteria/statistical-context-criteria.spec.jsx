import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer, reduxForm } from 'redux-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { noop } from '../../utils/test/test-utils';
import StatisticalContextCriteria from './statistical-context-criteria';

const store = createStore(combineReducers({ form: formReducer }));

const WrappedStatisticalContextCriteria = reduxForm({
  form: 'testForm', // you can use any form name
})(StatisticalContextCriteria);

describe('<StatisticalContextCriteria />', () => {
  let props;

  beforeEach(() => {
    props = {
      series: [],
      operations: [],
      focusOnInit: false,
      loadSeriesIfNeeded: noop,
      loadOperationsIfNeeded: noop,
      loadCampaignsIfNeeded: noop,
      formName: 'FAKE_FORM_NAME',
      path: 'FAKE_PATH.',
      horizontal: false,
    };
  });

  describe('Props and render behaviour', () => {
    test('Should exist a field of type Select with name "serie" and another with name "operation"', () => {
      render(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} />
        </Provider>,
      );

      // Check for "serie" field
      // warning : name is actually searching on the label
      const serieField = screen.queryByRole('combobox', {
        name: /serie/i,
      });
      expect(serieField).not.toBeNull();

      // Check for "operation" field
      // warning : name is actually searching on the label
      const operationField = screen.queryByRole('combobox', {
        name: /operation/i,
      });
      expect(operationField).not.toBeNull();
    });

    test('Should exist a field with name "campaign" only when the prop "campaigns" is defined', () => {
      const { rerender } = render(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} />
        </Provider>,
      );

      // Check for "campaigns" field
      // warning : name is actually searching on the label
      let campaignsField = screen.queryByRole('combobox', {
        name: /campaign/i,
      });
      expect(campaignsField).toBeNull();

      props.campaigns = [];
      rerender(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} campaigns={[]} />
        </Provider>,
      );

      // Check for "campaigns" field
      // warning : name is actually searching on the label
      campaignsField = screen.queryByRole('combobox', {
        name: /campaign/i,
      });

      expect(campaignsField).not.toBeNull();
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

      render(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} />
        </Provider>,
      );

      const serieField = screen.queryByRole('combobox', {
        name: /serie/i,
      });

      const operationField = screen.queryByRole('combobox', {
        name: /operation/i,
      });

      const campaignsField = screen.queryByRole('combobox', {
        name: /campaign/i,
      });

      // in addition to real options, there is an empty option by default
      const serieOptions = Array.from(
        serieField.querySelectorAll('option'),
      ).filter((option) => option.value !== '');

      const operationOptions = Array.from(
        operationField.querySelectorAll('option'),
      ).filter((option) => option.value !== '');

      const campaignsOptions = Array.from(
        campaignsField.querySelectorAll('option'),
      ).filter((option) => option.value !== '');

      expect(serieOptions.length).toBe(props.series.length);
      expect(operationOptions.length).toBe(props.operations.length);
      expect(campaignsOptions.length).toBe(props.campaigns.length);
    });

    test('Should prevent operation and campaigns selection when the prop "SelectedSerie" is not defined', () => {
      props.campaigns = [];
      render(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} />
        </Provider>,
      );

      const operationField = screen.queryByRole('combobox', {
        name: /operation/i,
      });

      const campaignsField = screen.queryByRole('combobox', {
        name: /campaign/i,
      });

      expect(operationField.getAttribute('disabled')).toBe('');
      expect(campaignsField.getAttribute('disabled')).toBe('');
    });

    test('Should prevent campaigns selection when the prop "SelectedOperation" is not defined', () => {
      props.campaigns = [];
      props.selectedSerie = 'FAKE_ID';
      render(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} />
        </Provider>,
      );

      const campaignsField = screen.queryByRole('combobox', {
        name: /campaign/i,
      });

      expect(campaignsField.getAttribute('disabled')).toBe('');
    });
  });

  describe('Actions', () => {
    test('Should call "loadSeriesIfNeeded" only once at the beginning', async () => {
      const spyLoadSeriesIfNeeded = vi.fn();
      props.loadSeriesIfNeeded = spyLoadSeriesIfNeeded;
      render(
        <Provider store={store}>
          <WrappedStatisticalContextCriteria {...props} />
        </Provider>,
      );

      // hook called once at begin
      expect(props.loadSeriesIfNeeded).toHaveBeenCalledOnce();
    });

    test(
      'Should call "loadOperationsIfNeeded" at the beginning using the selected serie passed as prop and when the ' +
        'selected serie changes using the new value',
      () => {
        const spyLoadOperationsIfNeeded = vi.fn();
        const selectedSerieFirst = 'FAKE_ID_01';
        const selectedSerieSecond = 'FAKE_ID_02';

        props = {
          ...props,
          selectedSerie: selectedSerieFirst,
          loadOperationsIfNeeded: spyLoadOperationsIfNeeded,
        };

        const { rerender } = render(
          <Provider store={store}>
            <WrappedStatisticalContextCriteria {...props} />
          </Provider>,
        );

        expect(props.loadOperationsIfNeeded).not.toHaveBeenCalledWith(
          selectedSerieFirst,
        );

        // Clear mock call history before next rerender
        props.loadOperationsIfNeeded.mockClear();

        rerender(
          <Provider store={store}>
            <WrappedStatisticalContextCriteria
              {...props}
              selectedSerie={selectedSerieSecond}
            />
          </Provider>,
        );

        expect(props.loadOperationsIfNeeded).not.toHaveBeenCalledWith(
          selectedSerieSecond,
        );
      },
    );

    test(
      'Should call "loadCampaignsIfNeeded" at the beginning using the selected serie passed as prop and when the ' +
        'selected serie changes using the new value only if the prop campaigns exists',
      () => {
        const spyLoadCampaignsIfNeeded = vi.fn();
        const selectedOperationFirst = 'FAKE_ID_01';
        const selectedOperationSecond = 'FAKE_ID_02';

        props = {
          ...props,
          selectedOperation: selectedOperationFirst,
          loadCampaignsIfNeeded: spyLoadCampaignsIfNeeded,
        };

        // Campaigns doesn't exist

        const { rerender } = render(
          <Provider store={store}>
            <WrappedStatisticalContextCriteria {...props} />
          </Provider>,
        );

        expect(props.loadCampaignsIfNeeded).toHaveBeenCalledOnce();

        // Clear mock call history before rerender
        props.loadCampaignsIfNeeded.mockClear();

        rerender(
          <Provider store={store}>
            <WrappedStatisticalContextCriteria
              {...props}
              selectedOperation={selectedOperationSecond}
            />
          </Provider>,
        );

        expect(props.loadCampaignsIfNeeded).toHaveBeenCalledOnce();

        // Campaigns exists

        props.campaigns = [];

        // Clear mock call history before rerender
        props.loadCampaignsIfNeeded.mockClear();

        rerender(
          <Provider store={store}>
            <WrappedStatisticalContextCriteria {...props} />
          </Provider>,
        );

        expect(props.loadCampaignsIfNeeded).not.toHaveBeenCalledWith(
          selectedOperationFirst,
        );

        // Clear mock call history before rerender
        props.loadCampaignsIfNeeded.mockClear();

        rerender(
          <Provider store={store}>
            <WrappedStatisticalContextCriteria
              {...props}
              selectedOperation={selectedOperationSecond}
            />
          </Provider>,
        );

        expect(props.loadCampaignsIfNeeded).not.toHaveBeenCalledWith(
          selectedOperationSecond,
        );
      },
    );
  });
});
