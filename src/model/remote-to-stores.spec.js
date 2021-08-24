import { questionnaireListRemoteToStores } from './remote-to-stores';

describe('remote to stores', () => {
  it('questionnaireListRemoteToStores', () => {
    const remote = [
      {
        final: false,
        id: 'jf0s8i94',
        Label: ['questionnaire'],
        lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
        DataCollection: [],
        TargetMode: [''],
        Name: 'QUESTIONNA',
        flowLogic: 'REDIRECTION',
        formulasLanguage: 'VTL',
      },
    ];
    const output = questionnaireListRemoteToStores(remote);
    const expected = [
      {
        jf0s8i94: {
          TargetMode: [''],
          campaigns: [],
          dynamiqueSpecified: 'Redirections',
          formulaSpecified: 'VTL',
          final: false,
          formulaSpecified: 'XPATH',
          id: 'jf0s8i94',
          label: 'questionnaire',
          lastUpdatedDate: 'Wed Mar 21 2018 10:23:37 GMT+0100 (CET)',
          name: 'QUESTIONNA',
        },
      },
    ];
    expect(output).toEqual(expected);
  });
});
