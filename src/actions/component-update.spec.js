import {
  resetChildren,
  increaseWeightOfAll,
  resetWeight,
  resetAllWeight,
} from './component-update';

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
        weight: 0,
        parent: '1',
        children: ['5', '3', '4'],
      },
      '4': {
        id: '4',
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
      '4': {
        id: '4',
        weight: 1,
        parent: '1',
      },
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
    const components = [
      { id: '1', weight: 7 },
      { id: '3', weight: 2 },
      { id: '5', weight: 4 },
    ];

    const result = resetWeight(components);

    expect(result['3']).toEqual({ id: '3', weight: 0 });
    expect(result['5']).toEqual({ id: '5', weight: 1 });
    expect(result['1']).toEqual({ id: '1', weight: 2 });
  });
});

describe('resetAllWeight', () => {
  const components = {
    '0': { id: '0', weight: 0, children: ['1', '6'] },
    '1': { id: '1', weight: 7, children: ['3', '5'] },
    '3': { id: '3', weight: 2, children: [] },
    '5': { id: '5', weight: 4, children: [] },
    '6': { id: '6', weight: 5, children: ['7', '8'] },
    '7': { id: '7', weight: 2, children: [] },
    '8': { id: '8', weight: 4, children: [] },
  };

  const result = resetAllWeight(components);

  expect(result['1'].weight).toEqual(1);
  expect(result['3'].weight).toEqual(0);
  expect(result['5'].weight).toEqual(1);

  expect(result['6'].weight).toEqual(0);
  expect(result['7'].weight).toEqual(0);
  expect(result['8'].weight).toEqual(1);
});
