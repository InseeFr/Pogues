import {
  getListGotos,
  getComponentsTargetsByComponent,
  getComponentsTargetsByPosition,
} from './redirections-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

import { componentsStore, listGotos } from './__mocks__/redirections-utils';

const { SEQUENCE, SUBSEQUENCE, QUESTION } = COMPONENT_TYPE;

describe('Redirections utils', () => {
  describe('getListGotos', () => {
    test('Should return an empty array if no components are provided', () => {
      expect(getListGotos({}, Object.keys(componentsStore))).toEqual([]);
    });
    test('Should return the expected array if components are provided', () => {
      expect(
        getListGotos(componentsStore, Object.keys(componentsStore)),
      ).toEqual(listGotos);
    });
    test('Should return the expected array if components are provided and some of then are disabled', () => {
      const activeComponentsIds = ['SUBSEQUENCE2', 'QUESTION2', 'QUESTION3'];
      const expectedListGotos = listGotos.map(goto => {
        return {
          ...goto,
          disabled: activeComponentsIds.indexOf(goto.value) === -1,
        };
      });

      expect(getListGotos(componentsStore, activeComponentsIds)).toEqual(
        expectedListGotos,
      );
    });
  });

  describe('getComponentsTargetsByComponent', () => {
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
        'idendquest',
      ];

      expect(
        getComponentsTargetsByComponent(componentsStore, sequence),
      ).toEqual(expectedComponentsIds);
    });

    test('Should obtains the right targets for a SUBSEQUENCE', () => {
      const sequence = componentsStore.SUBSEQUENCE1;
      const expectedComponentsIds = [
        'QUESTION1',
        'SEQUENCE2',
        'SUBSEQUENCE2',
        'QUESTION2',
        'QUESTION3',
        'idendquest',
      ];

      expect(
        getComponentsTargetsByComponent(componentsStore, sequence),
      ).toEqual(expectedComponentsIds);
    });

    test('Should obtains the right targets for a QUESTION with depth 2', () => {
      const sequence = componentsStore.QUESTION1;
      const expectedComponentsIds = [
        'SEQUENCE2',
        'SUBSEQUENCE2',
        'QUESTION2',
        'QUESTION3',
        'idendquest',
      ];

      expect(
        getComponentsTargetsByComponent(componentsStore, sequence),
      ).toEqual(expectedComponentsIds);
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
        'idendquest',
      ];

      expect(
        getComponentsTargetsByComponent(componentsStore, sequence),
      ).toEqual(expectedComponentsIds);
    });
  });
  describe('getComponentsTargetsByPosition', () => {
    describe('Without a selected component', () => {
      test('Should obtains the right targets for a SEQUENCE', () => {
        const type = SEQUENCE;
        const expectedComponentsIds = [];

        expect(getComponentsTargetsByPosition(componentsStore, type)).toEqual(
          expectedComponentsIds,
        );
      });

      test('Should obtains the right targets for a SUBSEQUENCE', () => {
        const type = SUBSEQUENCE;
        const expectedComponentsIds = [
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
        ];

        expect(getComponentsTargetsByPosition(componentsStore, type)).toEqual(
          expectedComponentsIds,
        );
      });

      test('Should obtains the right targets for a QUESTION', () => {
        const type = QUESTION;
        const expectedComponentsIds = [];

        expect(getComponentsTargetsByPosition(componentsStore, type)).toEqual(
          expectedComponentsIds,
        );
      });
    });

    describe('With a selected component', () => {
      test('Should obtains the right targets for a SEQUENCE with selected component "SEQUENCE1"', () => {
        const type = SEQUENCE;
        const selectedComponent = 'SEQUENCE1';
        const expectedComponentsIds = [
          'QUESTION5',
          'SUBSEQUENCE1',
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a SEQUENCE with selected component "QUESTION5"', () => {
        const type = SEQUENCE;
        const selectedComponent = 'QUESTION5';
        const expectedComponentsIds = [
          'SUBSEQUENCE1',
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a SEQUENCE with selected component "SUBSEQUENCE1"', () => {
        const type = SEQUENCE;
        const selectedComponent = 'SUBSEQUENCE1';
        const expectedComponentsIds = [
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a SUBSEQUENCE with selected component "SEQUENCE1"', () => {
        const type = SUBSEQUENCE;
        const selectedComponent = 'SEQUENCE1';
        const expectedComponentsIds = [
          'QUESTION5',
          'SUBSEQUENCE1',
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a SUBSEQUENCE with selected component "SUBSEQUENCE1"', () => {
        const type = SUBSEQUENCE;
        const selectedComponent = 'SUBSEQUENCE1';
        const expectedComponentsIds = [
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a SUBSEQUENCE with selected component "QUESTION5"', () => {
        const type = SUBSEQUENCE;
        const selectedComponent = 'QUESTION5';
        const expectedComponentsIds = [
          'SUBSEQUENCE1',
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a QUESTION with selected component "SEQUENCE1"', () => {
        const type = QUESTION;
        const selectedComponent = 'SEQUENCE1';
        const expectedComponentsIds = [
          'QUESTION5',
          'SUBSEQUENCE1',
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a QUESTION with selected component "QUESTION5"', () => {
        const type = QUESTION;
        const selectedComponent = 'QUESTION5';
        const expectedComponentsIds = [
          'SUBSEQUENCE1',
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });

      test('Should obtains the right targets for a QUESTION with selected component "SUBSEQUENCE1"', () => {
        const type = QUESTION;
        const selectedComponent = 'SUBSEQUENCE1';
        const expectedComponentsIds = [
          'QUESTION1',
          'SEQUENCE2',
          'SUBSEQUENCE2',
          'QUESTION2',
          'QUESTION3',
          'idendquest',
        ];

        expect(
          getComponentsTargetsByPosition(
            componentsStore,
            type,
            selectedComponent,
          ),
        ).toEqual(expectedComponentsIds);
      });
    });
  });
});
