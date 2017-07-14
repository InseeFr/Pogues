import { normalizeCodes, normalizeCodeList, resetWeight, resetChildren, increaseWeightOfAll } from './component';

describe('resetChildren', () => {
  test(`should return the same component but a new version of children`, () => {
    const children = [{ id: '1' }];
    expect(resetChildren({ id: 'key' }, children)).toEqual({
      key: {
        id: 'key',
        children: ['1'],
      },
    });
  });
});

describe('increaseWeightOfAll', () => {
  test(`should increase the weight of children for all child with the weight equal or bigger than the new component`, () => {
    const newComponent = {
      id: '2',
      weight: 2,
      parent: '1',
    };

    const components = {
      '1': {
        id: '1',
        weight: 1,
        parent: '1',
        children: ['5', '3', '4'],
      },
      '4': {
        id: '5',
        weight: 1,
        parent: '1',
      },
      '5': {
        id: '5',
        weight: 2,
        parent: '1',
      },
      '3': {
        id: '3',
        weight: 3,
        parent: '1',
      },
      '7': {
        id: '4',
        weight: 0,
        parent: '2',
      },
    };
    expect(increaseWeightOfAll(components, newComponent)).toEqual({
      '5': {
        id: '5',
        weight: 3,
        parent: '1',
      },
      '3': {
        id: '3',
        weight: 4,
        parent: '1',
      },
    });
  });
});

describe('resetWeight', () => {
  test(`should sort first before the reset`, () => {
    const children = [{ id: '1', weight: 7 }, { id: '3', weight: 2 }, { id: '5', weight: 4 }];
    expect(resetWeight(children)['3']).toEqual({ id: '3', weight: 0 });
    expect(resetWeight(children)['5']).toEqual({ id: '5', weight: 1 });
    expect(resetWeight(children)['1']).toEqual({ id: '1', weight: 2 });
  });
});

describe('normalizeCodes', () => {
  test(`should return an empty object if the parameter is undefined`, () => {
    expect(normalizeCodes()).toEqual({});
  });
  test(`should normalize a list of codes`, () => {
    const codes = [{ id: '1' }, { id: '2' }];
    expect(normalizeCodes(codes)).toEqual({
      '1': { id: '1' },
      '2': { id: '2' },
    });
  });
});

/* describe('normalizeCodeList', () => {
  test(`should sort first before the reset`, () => {
    const children = [{ id: '1', weight: 7 }, { id: '3', weight: 2 }, { id: '5', weight: 4 }];
    expect(resetWeight(children)['3']).toEqual({ id: '3', weight: 0 });
    expect(resetWeight(children)['5']).toEqual({ id: '5', weight: 1 });
    expect(resetWeight(children)['1']).toEqual({ id: '1', weight: 2 });
  });
});*/
