import * as component from './component';

jest.mock('./component-moves');

describe('normalizeCodes', () => {
  test(`should return an empty object if the parameter is undefined`, () => {
    expect(component.normalizeCodes()).toEqual({});
  });
  test(`should normalize a list of codes`, () => {
    const codes = [{ id: '1' }, { id: '2' }];
    expect(component.normalizeCodes(codes)).toEqual({
      '1': { id: '1' },
      '2': { id: '2' },
    });
  });
});

describe('normalizeCodeList', () => {
  test(`should return an empty object if the parameter is undefined`, () => {
    expect(component.normalizeCodeList()).toEqual({});
  });
  test(`should add codeIds to a codelist`, () => {
    const codesIds = ['1', '2', '3'];
    const codesList = { id: '1', prop: 'value' };
    const result = {
      '1': { id: '1', prop: 'value', codes: ['1', '2', '3'] },
    };
    expect(component.normalizeCodeList(codesList, codesIds)).toEqual(result);
  });
});

describe('updateParentChildren', () => {
  function getState() {
    return {
      appState: {
        activeComponentsById: { '2': { id: '2', children: [] } },
      },
    };
  }
  const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
  const fn = component.updateParentChildren(payload);

  test(`should trigger the UPDATE_COMPONENT action`, () => {
    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test(`should return the ID of the new component`, () => {
    function dispatch(param) {
      expect(param.payload.id).toEqual(payload.payload.id);
    }
    fn(dispatch, getState);
  });

  test(`should call return the last created component`, () => {
    function dispatch(param) {
      expect(param.payload.lastCreatedComponent).toEqual(payload.payload.lastCreatedComponent);
    }
    fn(dispatch, getState);
  });

  test(`should call return the updated parent`, () => {
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ '2': { id: '2', children: ['1'] } });
    }
    fn(dispatch, getState);
  });
});

describe('updateNewComponentParent', () => {
  test(`should return an parent component with the new children`, () => {
    const activeComponents = {
      '1': {
        id: '1',
        children: ['2', '3'],
      },
    };
    expect(component.updateNewComponentParent(activeComponents, '1', '4')).toEqual({
      '1': {
        id: '1',
        children: ['2', '3', '4'],
      },
    });
  });
});

describe('orderComponents', () => {
  function getState() {
    return {
      appState: {
        activeComponentsById: { '2': { id: '2', children: [] } },
      },
    };
  }

  test(`should trigger the UPDATE_COMPONENT action`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test(`should return the ID of the new component`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.id).toEqual(payload.payload.id);
    }
    fn(dispatch, getState);
  });

  test(`should call moveQuestionAndSubSequenceToSequence`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'SEQUENCE' } } } };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ moveQuestionAndSubSequenceToSequence: true });
    }
    fn(dispatch, getState);
  });

  test(`should call moveQuestionToSubSequence`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'SUBSEQUENCE' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ moveQuestionToSubSequence: true });
    }
    fn(dispatch, getState);
  });

  test(`should call increaseWeightOfAll`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'QUESTION' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ increaseWeightOfAll: true });
    }
    fn(dispatch, getState);
  });
});
