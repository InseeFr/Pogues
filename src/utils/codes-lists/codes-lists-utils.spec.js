import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import {
  removeOrphansCodesLists,
  getSingleCodesLists,
  getMultipleCodesLists,
  getTableCodesLists,
  hasChild,
} from './codes-lists-utils';
import {
  codesListsStore,
  expectedCodesListsStore,
  componentsStore,
  singleFormatCodesListsIds,
  multipleFormatCodesListsIds,
  tableFormatCodesListsIds,
  listCodes,
} from './__mocks__/codes-lists-utils';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

describe('Codes lists utils', () => {
  test('getSingleCodesLists should return only the codes lists linked to a component', () => {
    expect(
      getSingleCodesLists(
        componentsStore.COMPONENT_ID_1.responseFormat[SINGLE_CHOICE],
      ),
    ).toEqual(singleFormatCodesListsIds);
  });
  test('getMultipleCodesLists should return only the codes lists linked to a component', () => {
    expect(
      getMultipleCodesLists(
        componentsStore.COMPONENT_ID_2.responseFormat[MULTIPLE_CHOICE],
      ),
    ).toEqual(multipleFormatCodesListsIds);
  });
  test('getTableCodesLists should return only the codes lists linked to a component', () => {
    expect(
      getTableCodesLists(componentsStore.COMPONENT_ID_3.responseFormat[TABLE]),
    ).toEqual(tableFormatCodesListsIds);
  });
  test('removeOrphansCodesLists should return only the codes lists linked to a component', () => {
    expect(removeOrphansCodesLists(codesListsStore, componentsStore)).toEqual(
      expectedCodesListsStore,
    );
  });
  test('hasChild should return false', () => {
    expect(hasChild({ value: '2' }, listCodes)).toBeFalsy();
  });
  test('hasChild should return true', () => {
    expect(hasChild({ value: '1' }, listCodes)).toBeTruthy();
  });
});
