import { describe, expect, it } from 'vitest';

import Dictionary from '../utils/dictionary/dictionary';
import {
  cartCodeModeCollecte,
  emptyMeasures,
  letterStart,
  maxLength,
  maxValue,
  maximumRequired,
  minValue,
  minimumRequired,
  name,
  nameSize,
  required,
  requiredSelect,
  validateDuplicates,
  validateExistingTarget,
} from './validation-rules';

describe('required', () => {
  it('should return required field message if value is null or undefined', () => {
    expect(required(null)).toEqual(Dictionary.validationRequired);
    expect(required(undefined)).toEqual(Dictionary.validationRequired);
  });
  it('should handle string value, returning required field message only if empty string', () => {
    expect(required('')).toEqual(Dictionary.validationRequired);
    expect(required('my value')).toBeUndefined();
  });
  it('should accept numeric value', () => {
    expect(required(2)).toBeUndefined();
    expect(required(-2)).toBeUndefined();
    expect(required(0)).toBeUndefined();
  });
});

describe('maxLength', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(maxLength(max)()).toBeUndefined();
  });
  it('should return the error message if defined', () => {
    expect(maxLength(max)('sdfsfsdfsdfsdfs')).toEqual(
      `Must be ${max} characters or less`,
    );
  });
  it('should return undefined', () => {
    expect(maxLength(max)('sdfs')).toBeUndefined();
  });
});

describe('minValue', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(minValue(max)()).toEqual(`${Dictionary.validationMinNumber} ${max}`);
  });
  it('should return the error message if defined', () => {
    expect(minValue(max)(2)).toEqual(
      `${Dictionary.validationMinNumber} ${max}`,
    );
  });
  it('should return undefined', () => {
    expect(minValue(max)(6)).toBeUndefined();
  });
});

describe('maxValue', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(maxValue(max)()).toEqual(`${Dictionary.validationMaxNumber} ${max}`);
  });
  it('should return the error message if defined', () => {
    expect(maxValue(max)(6)).toEqual(
      `${Dictionary.validationMaxNumber} ${max}`,
    );
  });
  it('should return undefined', () => {
    expect(maxValue(max)(4)).toBeUndefined();
  });
});

describe('requiredSelect', () => {
  it('should return the error message', () => {
    expect(requiredSelect()).toEqual(Dictionary.validationRequired);
  });
  it('should return undefined', () => {
    expect(requiredSelect(['value'])).toBeUndefined();
  });
});

describe('name', () => {
  it('should return the error message', () => {
    expect(name('name with space')).toEqual(Dictionary.validationInvalidName);
  });
  it('should return undefined', () => {
    expect(name('value')).toBeUndefined();
  });
});

describe('nameSize', () => {
  it('should return the error message', () => {
    expect(nameSize('long long long long long longvalue')).toEqual(
      Dictionary.validationInvalidNameSize,
    );
  });
  it('should return undefined', () => {
    expect(nameSize('value')).toBeUndefined();
  });
});

describe('emptyMeasures', () => {
  it('should return the error message', () => {
    expect(emptyMeasures([])).toEqual(Dictionary.noMeasureYet);
  });
  it('should return undefined', () => {
    expect(emptyMeasures(['value'])).toBeUndefined();
  });
});

describe('validateExistingTarget', () => {
  it('should return the error message', () => {
    expect(
      validateExistingTarget('value', { stores: { componentsStore: {} } }),
    ).toEqual(Dictionary.errorGoToNonExistingTgt);
  });
  it('should return undefined', () => {
    expect(
      validateExistingTarget('value', {
        stores: { componentsStore: { value: {} } },
      }),
    ).toBeUndefined();
  });
});

describe('validateDuplicates', () => {
  it('should return the error message', () => {
    expect(validateDuplicates('value', { form: [{ name: 'value' }] })).toEqual(
      'Duplicated',
    );
  });
  it('should return undefined', () => {
    expect(
      validateDuplicates('value', { form: [{ name: 'value2' }] }),
    ).toBeUndefined();
  });
});

describe('letterStart', () => {
  it('should return the error message if  Identifiant start with number', () => {
    expect(letterStart('5TTJDJ')).toEqual(Dictionary.IsNotLetter);
  });
  it('should return undefined if value undefined', () => {
    expect(letterStart(undefined)).toBeUndefined();
  });
});

describe('minimumRequired', () => {
  const value = '';
  const state = {
    form: {
      TargetMode: '',
      addButtonLibel: '',
      basedOn: 'j6qg8rc6',
      controls: {},
      declarations: {},
      description: '',
      filter: '',
      filterImbriquer: [],
      finalMember: 'j6p0ti5h',
      initialMember: 'j6p0ti5h',
      label: '',
      maximum: '$MAYOR$  > 1',
      minimum: '',
      name: '',
      nameLoop: 'loop1',
      redirections: {},
    },
  };
  it('should return the error message if maximum is defined and mimimum is not', () => {
    expect(minimumRequired(value, state)).toEqual(true);
  });
});

describe('maximumRequired', () => {
  const value = '';
  const state = {
    form: {
      TargetMode: '',
      addButtonLibel: '',
      basedOn: 'j6qg8rc6',
      controls: {},
      declarations: {},
      description: '',
      filter: '',
      filterImbriquer: [],
      finalMember: 'j6p0ti5h',
      initialMember: 'j6p0ti5h',
      label: '',
      maximum: '',
      minimum: '$MAYOR$  > 1',
      name: '',
      nameLoop: 'loop1',
      redirections: {},
    },
  };
  it('should return the error message if maximum is defined and mimimum is not', () => {
    expect(maximumRequired(value, state)).toEqual(true);
  });
});

describe('cartCodeModeCollecte', () => {
  it('should return true declaration TargetMode empty and declaration type is CODECARD', () => {
    const value = 'CODECARD';
    const state = {
      form: {
        declarations: {
          TargetMode: '',
          declarationType: 'CODECARD',
          declarations: [],
          label: 'declar',
          position: 'AFTER_QUESTION_TEXT',
        },
      },
      stores: {},
    };
    expect(cartCodeModeCollecte(value, state)).toEqual(true);
  });
  it('should return true declaration CAWI or PAPI include in TargetMode and declaration type is CODECARD', () => {
    const value = 'CODECARD';
    const state = {
      form: {
        declarations: {
          TargetMode: 'CAWI,CAPI,CATI',
          declarationType: 'CODECARD',
          declarations: [],
          label: 'declar',
          position: 'AFTER_QUESTION_TEXT',
        },
      },
      stores: {},
    };
    expect(cartCodeModeCollecte(value, state)).toEqual(true);
  });
});
