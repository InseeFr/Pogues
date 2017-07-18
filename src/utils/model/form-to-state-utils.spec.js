import { updateNewComponentParent } from './form-to-state-utils';

jest.dontMock('./form-to-state-utils.js');

describe('updateNewComponentParent', () => {
  test(`should return an parent component with the new children`, () => {
    const activeComponents = {
      '1': {
        id: '1',
        children: ['2', '3'],
      },
    };
    expect(updateNewComponentParent(activeComponents, '1', '4')).toEqual({
      '1': {
        id: '1',
        children: ['2', '3', '4'],
      },
    });
  });
});
