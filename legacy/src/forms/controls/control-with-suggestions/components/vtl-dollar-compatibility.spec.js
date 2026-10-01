import {
  filterPoguesDollarCompatibilityErrors,
  isPoguesDollarCompatibilityError,
} from './vtl-dollar-compatibility';

describe('vtl-dollar-compatibility', () => {
  it('detects classic ANTLR token recognition errors on $', () => {
    expect(
      isPoguesDollarCompatibilityError({
        line: 1,
        column: 1,
        message: "token recognition error at: '$'",
      }),
    ).toBe(true);
  });

  it('detects extraneous / mismatched input messages on $', () => {
    expect(
      isPoguesDollarCompatibilityError({
        message: "extraneous input '$' expecting ')'",
      }),
    ).toBe(true);
    expect(
      isPoguesDollarCompatibilityError({
        message: "mismatched input '$' expecting IDENTIFIER",
      }),
    ).toBe(true);
  });

  it('detects errors whose position points at a $ in the script', () => {
    expect(
      isPoguesDollarCompatibilityError(
        { line: 1, column: 5, message: 'no viable alternative' },
        'nvl($AGE$, 0)',
      ),
    ).toBe(true);
  });

  it('detects $ on a later line', () => {
    expect(
      isPoguesDollarCompatibilityError(
        { line: 2, column: 1, message: 'whatever' },
        'nvl(\n$AGE$, 0)',
      ),
    ).toBe(true);
  });

  it('keeps real VTL errors', () => {
    expect(
      isPoguesDollarCompatibilityError(
        { line: 1, column: 1, message: "mismatched input 'foo' expecting ')'" },
        'foo(',
      ),
    ).toBe(false);
  });

  it('keeps non-dollar errors even when the script contains $VAR$', () => {
    expect(
      isPoguesDollarCompatibilityError(
        {
          line: 1,
          column: 1,
          message: "mismatched input 'nvl' expecting <EOF>",
        },
        'nvl($AGE$,',
      ),
    ).toBe(false);
  });

  it('filters only dollar compatibility errors from a list', () => {
    const script = 'nvl($AGE$, 0)';
    const errors = [
      { line: 1, column: 5, message: "token recognition error at: '$'" },
      { line: 1, column: 9, message: "token recognition error at: '$'" },
      {
        line: 1,
        column: 1,
        message: "mismatched input 'nvl' expecting <EOF>",
      },
    ];

    expect(filterPoguesDollarCompatibilityErrors(errors, script)).toEqual([
      {
        line: 1,
        column: 1,
        message: "mismatched input 'nvl' expecting <EOF>",
      },
    ]);
  });

  it('returns an empty list when only $ errors remain (typical $VAR$ formula)', () => {
    const script = 'nvl($AGE$, 0)';
    const errors = [
      { line: 1, column: 5, message: "token recognition error at: '$'" },
      { line: 1, column: 9, message: "token recognition error at: '$'" },
    ];

    expect(filterPoguesDollarCompatibilityErrors(errors, script)).toEqual([]);
  });

  it('handles empty / undefined error lists', () => {
    expect(filterPoguesDollarCompatibilityErrors()).toEqual([]);
    expect(filterPoguesDollarCompatibilityErrors([], 'x')).toEqual([]);
  });
});
