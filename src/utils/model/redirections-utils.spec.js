import { getListGotos, getComponentsTargets } from './redirections-utils';
import { componentsStore, listGotos } from './__mocks__/redirections-utils';

describe('Redirections utils', () => {
  describe('getListGotos', () => {
    test('Should return an empty array if no components are provided', () => {
      expect(getListGotos({}, Object.keys(componentsStore))).toEqual([]);
    });
    test('Should return the expected array if components are provided', () => {
      expect(getListGotos(componentsStore, Object.keys(componentsStore))).toEqual(listGotos);
    });
    test('Should return the expected array if components are provided and some of then are disabled', () => {
      const activeComponentsIds = ['SUBSEQUENCE2', 'QUESTION2', 'QUESTION3'];
      const expectedListGotos = listGotos.map(goto => {
        return {
          ...goto,
          disabled: activeComponentsIds.indexOf(goto.value) === -1,
        };
      });

      expect(getListGotos(componentsStore, activeComponentsIds)).toEqual(expectedListGotos);
    });
  });

  describe('getComponentTargets', () => {
    test('Should obtains the right targets for a SEQUENCE', () => {
      const sequence = componentsStore.SEQUENCE1;
      const expectedComponentsIds = [
        'QUESTION5',
        'SUBSEQUENCE1',
        'QUESTION1',
        'SEQUENCE2',
        'SUBSEQUENCE2',
        'QUESTION2',
        'QUESTION3',
      ];

      expect(getComponentsTargets(componentsStore, sequence)).toEqual(expectedComponentsIds);
    });

    test('Should obtains the right targets for a SUBSEQUENCE', () => {
      const sequence = componentsStore.SUBSEQUENCE1;
      const expectedComponentsIds = ['QUESTION1', 'SEQUENCE2', 'SUBSEQUENCE2', 'QUESTION2', 'QUESTION3'];

      expect(getComponentsTargets(componentsStore, sequence)).toEqual(expectedComponentsIds);
    });

    test('Should obtains the right targets for a QUESTION with depth 2', () => {
      const sequence = componentsStore.QUESTION1;
      const expectedComponentsIds = ['SEQUENCE2', 'SUBSEQUENCE2', 'QUESTION2', 'QUESTION3'];

      expect(getComponentsTargets(componentsStore, sequence)).toEqual(expectedComponentsIds);
    });

    test('Should obtains the right targets for a QUESTION with depth 1', () => {
      const sequence = componentsStore.QUESTION5;
      const expectedComponentsIds = [
        'SUBSEQUENCE1',
        'QUESTION1',
        'SEQUENCE2',
        'SUBSEQUENCE2',
        'QUESTION2',
        'QUESTION3',
      ];

      expect(getComponentsTargets(componentsStore, sequence)).toEqual(expectedComponentsIds);
    });
  });
});
