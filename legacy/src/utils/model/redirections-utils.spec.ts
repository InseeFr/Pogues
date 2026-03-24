import { describe, expect, test } from 'vitest';

import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { componentsStore } from './__mocks__/redirections-utils-data';
import {
  getComponentsTargetsByComponent,
  getComponentsTargetsByPosition,
} from './redirections-utils';

const { SEQUENCE, SUBSEQUENCE, QUESTION } = COMPONENT_TYPE;

describe('Redirections utils', () => {
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
        const expectedComponentsIds: string[] = [];

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
        const expectedComponentsIds: string[] = [];

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
