import {
  required,
  unique,
  uniqueCode,
  maxLength,
  maxLength15,
  number,
  minValue,
  maxValue,
  email,
  requiredSelect,
  requiredSelectMultiple,
  requiredListCheckboxes,
  name,
  nameSize,
  emptyCodes,
  emptyMeasures,
  uniqueCodeAttr,
  validCodesList,
  validCollectedVariables,
  validateEarlyTarget,
  validateExistingTarget,
  validateDuplicates,
  validateDuplicatesCalculated,
  validateDuplicatesExternal,
  validateDuplicatesCollected
} from './validation-rules';
import Dictionary from 'utils/dictionary/dictionary';

describe('maxLength', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(maxLength(max)()).toBeUndefined();
  });
  it('should return the error message if defined', () => {
    expect(maxLength(max)('sdfsfsdfsdfsdfs')).toEqual(
      `Must be ${max} characters or less`
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
      `${Dictionary.validationMinNumber} ${max}`
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
      `${Dictionary.validationMaxNumber} ${max}`
    );
  });
  it('should return undefined', () => {
    expect(maxValue(max)(4)).toBeUndefined();
  });
});

describe('email', () => {
  it('should return the error message', () => {
    expect(email('name with space')).toEqual('Invalid email address');
  });
  it('should return undefined', () => {
    expect(email('value@gmail.com')).toBeUndefined();
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

describe('requiredSelectMultiple', () => {
  it('should return the error message', () => {
    expect(requiredSelectMultiple()).toEqual(
      Dictionary.validationRequiredMultiple
    );
  });
  it('should return undefined', () => {
    expect(requiredSelectMultiple(['value'])).toBeUndefined();
  });
});

describe('requiredListCheckboxes', () => {
  it('should return the error message', () => {
    expect(requiredListCheckboxes('')).toEqual(
      Dictionary.validationRequiredMultiple
    );
  });
  it('should return undefined', () => {
    expect(requiredListCheckboxes('value')).toBeUndefined();
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
      Dictionary.validationInvalidNameSize
    );
  });
  it('should return undefined', () => {
    expect(nameSize('value')).toBeUndefined();
  });
});

describe('emptyCodes', () => {
  it('should return the error message', () => {
    expect(emptyCodes()).toEqual('No codes');
  });
  it('should return undefined', () => {
    expect(emptyCodes(['value'])).toBeUndefined();
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
      validateExistingTarget('value', { stores: { componentsStore: {} } })
    ).toEqual(Dictionary.errorGoToNonExistingTgt);
  });
  it('should return undefined', () => {
    expect(
      validateExistingTarget('value', {
        stores: { componentsStore: { value: {} } }
      })
    ).toBeUndefined();
  });
});

describe('validateDuplicates', () => {
  it('should return the error message', () => {
    expect(validateDuplicates('value', { form: [{ name: 'value' }] })).toEqual(
      'Duplicated'
    );
  });
  it('should return undefined', () => {
    expect(
      validateDuplicates('value', { form: [{ name: 'value2' }] })
    ).toBeUndefined();
  });
});
