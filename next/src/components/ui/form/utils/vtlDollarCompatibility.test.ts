import { describe, expect, it } from 'vitest'

import {
  filterPoguesDollarCompatibilityErrors,
  isPoguesDollarCompatibilityError,
} from './vtlDollarCompatibility'

describe('vtlDollarCompatibility', () => {
  it('detects classic ANTLR token recognition errors on $', () => {
    expect(
      isPoguesDollarCompatibilityError({
        line: 1,
        column: 1,
        message: "token recognition error at: '$'",
      }),
    ).toBe(true)
  })

  it('detects errors whose position points at a $ in the script', () => {
    expect(
      isPoguesDollarCompatibilityError(
        { line: 1, column: 5, message: 'no viable alternative' },
        'nvl($AGE$, 0)',
      ),
    ).toBe(true)
  })

  it('keeps real VTL errors', () => {
    expect(
      isPoguesDollarCompatibilityError(
        { line: 1, column: 1, message: "mismatched input 'foo' expecting ')'" },
        'foo(',
      ),
    ).toBe(false)
  })

  it('filters only dollar compatibility errors from a list', () => {
    const script = 'nvl($AGE$, 0)'
    const errors = [
      { line: 1, column: 5, message: "token recognition error at: '$'" },
      { line: 1, column: 9, message: "token recognition error at: '$'" },
      {
        line: 1,
        column: 1,
        message: "mismatched input 'nvl' expecting <EOF>",
      },
    ]

    expect(filterPoguesDollarCompatibilityErrors(errors, script)).toEqual([
      {
        line: 1,
        column: 1,
        message: "mismatched input 'nvl' expecting <EOF>",
      },
    ])
  })
})
