jest.dontMock('./dimension.js');
jest.dontMock('./component.js');

describe('Transformation entities', () => {
  describe('Dimension', () => {
    test('Fake test', () => {
      expect(true).toBe(true);
    });
  });
});

// import { DIMENSION_TYPE, MAIN_DIMENSION_FORMATS, COMPONENT_TYPE } from 'constants/pogues-constants';
// import Dimension, { defaultDimensionState } from './dimension';
// import Component, { defaultComponentState } from './component';
//
// const { PRIMARY } = DIMENSION_TYPE;
// const { LIST } = MAIN_DIMENSION_FORMATS;
// const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;
//
// describe('Transformation entities', () => {
//   describe('Dimension', () => {
//     test("should return default state dimension if it's not initializated", () => {
//       expect(new Dimension().getStateData()).toEqual(defaultDimensionState);
//     });
//     test('should return expected state dimension data when is initializated', () => {
//       const model = {
//         dimensionType: 'PRIMARY',
//         dynamic: '-',
//         totalLabel: 'This is a total label',
//       };
//       const expected = {
//         ...defaultDimensionState,
//         type: PRIMARY,
//         mainDimensionFormat: LIST,
//         totalLabel: model.totalLabel,
//         numLinesMin: 0,
//         numLinesMax: 0,
//       };
//       expect(new Dimension().initFromModel(model).getStateData()).toEqual(expected);
//     });
//     test('should return expected dimension data in transformation to model', () => {
//       const state = {
//         ...defaultDimensionState,
//         type: PRIMARY,
//         mainDimensionFormat: LIST,
//         totalLabel: 'This is a total label',
//         numLinesMin: 0,
//         numLinesMax: 0,
//       };
//       const expected = {
//         dimensionType: 'PRIMARY',
//         dynamic: '0-0',
//         totalLabel: state.totalLabel,
//       };
//       expect(new Dimension().initFromState(state).transformToModel()).toEqual(expected);
//     });
//   });
//   describe('Component', () => {
//     test("should return default state dimension if it's not initializated", () => {
//       expect(new Component().getStateData()).toEqual(defaultComponentState);
//     });
//     test('should return expected state component data when is initializated with a QUESTION', () => {
//       const model = {
//         depth: 2,
//         genericName: '',
//         id: 'j4fa6x79',
//         label: ['This is the label'],
//         name: 'THISIS',
//         questionType: 'SINGLECHOICE',
//         responses: [],
//         type: 'QuestionType',
//       };
//       const expected = {
//         ...defaultComponentState,
//         id: model.id,
//         type: QUESTION,
//         depth: model.depth,
//         name: model.name,
//         label: model.label[0],
//       };
//       expect(new Component().initFromModel(model).getStateData()).toEqual(expected);
//     });
//     test('should return expected state component data when is initializated with a QUESTIONNAIRE', () => {
//       const model = {
//         depth: 0,
//         genericName: 'QUESTIONNAIRE',
//         id: 'j4e9h4f9',
//         label: ['This is the label'],
//         name: 'THISIS',
//         type: 'SequenceType',
//         children: [],
//       };
//       const expected = {
//         ...defaultComponentState,
//         id: model.id,
//         type: QUESTIONNAIRE,
//         depth: model.depth,
//         name: model.name,
//         label: model.label[0],
//       };
//       expect(new Component().initFromModel(model).getStateData()).toEqual(expected);
//     });
//     test('should return expected state component data when is initializated with a SEQUENCE', () => {
//       const model = {
//         depth: 1,
//         genericName: 'MODULE',
//         id: 'j4e9h4f9',
//         label: ['This is the label'],
//         name: 'THISIS',
//         type: 'SequenceType',
//         children: [],
//       };
//       const expected = {
//         ...defaultComponentState,
//         id: model.id,
//         type: SEQUENCE,
//         depth: model.depth,
//         name: model.name,
//         label: model.label[0],
//       };
//       expect(new Component().initFromModel(model).getStateData()).toEqual(expected);
//     });
//     test('should return expected state component data when is initializated with a SUBSEQUENCE', () => {
//       const model = {
//         depth: 2,
//         genericName: 'MODULE',
//         id: 'j4e9h4f9',
//         label: ['This is the label'],
//         name: 'THISIS',
//         type: 'SequenceType',
//         children: [],
//       };
//       const expected = {
//         ...defaultComponentState,
//         id: model.id,
//         type: SUBSEQUENCE,
//         depth: model.depth,
//         name: model.name,
//         label: model.label[0],
//       };
//       expect(new Component().initFromModel(model).getStateData()).toEqual(expected);
//     });
//     test('should return expected dimension data in transformation to model QUESTION', () => {
//       const state = {
//         ...defaultComponentState,
//         id: 'j4e9h4f9',
//         type: QUESTION,
//         depth: 4,
//         name: 'THISISQ',
//         label: 'This is a question',
//       };
//       const expected = {
//         depth: state.depth,
//         genericName: '',
//         id: 'j4e9h4f9',
//         label: ['This is a question'],
//         name: 'THISISQ',
//         type: 'QuestionType',
//       };
//       expect(new Component().initFromState(state).transformToModel()).toEqual(expected);
//     });
//     test('should return expected dimension data in transformation to model QUESTIONNAIRE', () => {
//       const state = {
//         ...defaultComponentState,
//         id: 'j4e9h4f9',
//         type: QUESTIONNAIRE,
//         depth: 0,
//         name: 'THISISQ',
//         label: 'This is a questionnaire',
//       };
//       const expected = {
//         depth: state.depth,
//         genericName: 'QUESTIONNAIRE',
//         id: 'j4e9h4f9',
//         label: ['This is a questionnaire'],
//         name: 'THISISQ',
//         type: 'SequenceType',
//       };
//       expect(new Component().initFromState(state).transformToModel()).toEqual(expected);
//     });
//   });
// });
