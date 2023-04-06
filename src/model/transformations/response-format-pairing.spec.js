import { remoteToState } from './response-format-pairing';

describe('response format pairing', () => {
  it('remoteToState', () => {
    const remote = {
      responses: [
        {
          id: 'jf0w19iw',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            visualizationHint: 'CHECKBOX',
            MaxLength: 1,
            Pattern: '',
          },
          CodeListReference: 'jf0w3fab',
          mandatory: true,
        },
      ],
      scope: 'jsaispas',
    };
    const output = remoteToState(remote);
    const expected = {
      CodesList: { id: 'jf0w3fab' },
      hasSpecialCode: false,
      id: 'jf0w19iw',
      mandatory: true,
      specialCode: '',
      specialFollowUpMessage: '',
      specialLabel: '',
      specialUiBehaviour: 'FIRST_INTENTION',
      visHint: 'CHECKBOX',
      scope: 'jsaispas',
    };
    expect(output).toEqual(expected);
  });
  it('remoteToState with optional elements', () => {
    const remote = {
      responses: [
        {
          id: 'jf0w19iw',
          Datatype: {
            typeName: 'TEXT',
            type: 'TextDatatypeType',
            visualizationHint: 'CHECKBOX',
            MaxLength: 1,
            Pattern: '',
          },
          CodeListReference: 'jf0w3fab',
          mandatory: true,
          nonResponseModality: {
            label: 'non réponse',
            value: 'NR',
            invite: 'non rép',
          },
        },
      ],
      scope: 'jsaispas',
    };
    const output = remoteToState(remote);
    const expected = {
      CodesList: { id: 'jf0w3fab' },
      hasSpecialCode: true,
      id: 'jf0w19iw',
      mandatory: true,
      specialLabel: 'non réponse',
      specialCode: 'NR',
      specialFollowUpMessage: 'non rép',
      specialUiBehaviour: 'SECOND_INTENTION',
      visHint: 'CHECKBOX',
      scope: 'jsaispas',
    };
    expect(output).toEqual(expected);
  });
});
