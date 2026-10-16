import { schema } from './schema'

/** Values of every fields of the form, as they could be in the form state. */
const formValues = {
  name: 'my loop',
  initialMember: 'S1',
  finalMember: 'S2',
  basedOn: '',
  filter: 'my filter',
  size: '3',
  shouldSplitIterations: true,
  minimum: '1',
  maximum: '2',
  addButtonLabel: 'Add',
}

const common = { name: 'my loop', initialMember: 'S1', finalMember: 'S2' }

/** Return the paths of the fields in error. */
function errorPaths(values: object) {
  return (schema.safeParse(values).error?.issues ?? []).map((issue) =>
    issue.path.join('.'),
  )
}

describe('loop schema', () => {
  it('keeps only the scope and filter when the loop is based on a scope', () => {
    expect(
      schema.parse({ ...formValues, basedOn: 'scope1', isFixedLength: false }),
    ).toEqual({
      ...common,
      basedOn: 'scope1',
      filter: 'my filter',
    })
  })

  it('keeps only the size when the loop has a fixed length', () => {
    expect(schema.parse({ ...formValues, isFixedLength: true })).toEqual({
      ...common,
      basedOn: '',
      isFixedLength: true,
      size: '3',
      shouldSplitIterations: true,
    })
  })

  it('keeps only minimum and maximum when the loop has a dynamic length', () => {
    expect(schema.parse({ ...formValues, isFixedLength: false })).toEqual({
      ...common,
      basedOn: '',
      isFixedLength: false,
      minimum: '1',
      maximum: '2',
      addButtonLabel: 'Add',
    })
  })

  it('reports only the errors of the option matching the scope', () => {
    expect(errorPaths({ ...common, basedOn: 'scope1' })).toEqual([])
    expect(
      errorPaths({ ...common, basedOn: '', isFixedLength: false }),
    ).toEqual(['minimum', 'maximum'])
  })

  it('requires the size when the loop has a fixed length', () => {
    expect(
      errorPaths({
        ...common,
        isFixedLength: true,
        shouldSplitIterations: true,
      }),
    ).toEqual(['size'])
    expect(
      errorPaths({
        ...common,
        isFixedLength: true,
        shouldSplitIterations: true,
        size: '  ',
      }),
    ).toEqual(['size'])
  })

  it('requires minimum and maximum when the loop has a dynamic length', () => {
    expect(errorPaths({ ...common, isFixedLength: false })).toEqual([
      'minimum',
      'maximum',
    ])
  })

  it('reports occurrences errors along with other errors', () => {
    expect(
      errorPaths({
        ...common,
        name: '',
        finalMember: '',
        isFixedLength: false,
      }),
    ).toEqual(['name', 'finalMember', 'minimum', 'maximum'])
  })
})
