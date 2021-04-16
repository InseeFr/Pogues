import { loadUnitsIfNeeded } from './metadata';

describe('loadUnitsIfNeeded', () => {
  it('should not call the dispatch method if the units are defined', () => {
    const getState = function () {
      return { metadataByType: { units: 'units' } };
    };
    const dispatch = jest.fn();
    loadUnitsIfNeeded()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('should call the dispatch method if the units are undefined', () => {
    const getState = function () {
      return { metadataByType: {} };
    };
    const dispatch = jest.fn();
    loadUnitsIfNeeded()(dispatch, getState);
    expect(dispatch).toHaveBeenCalled();
  });
});
