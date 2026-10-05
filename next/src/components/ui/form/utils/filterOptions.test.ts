import { filterOptions, normalize } from './filterOptions'

describe('normalize', () => {
  it('lowercases the value', () => {
    expect(normalize('ÉTUDES')).toBe('etudes')
  })

  it('removes all kinds of accents', () => {
    expect(normalize('À É È Ê Ë Î Ï Ô Ö Ù Û Ü Ç')).toBe(
      'a e e e e i i o o u u u c',
    )
    expect(normalize('à é è ê ë î ï ô ö ù û ü ç')).toBe(
      'a e e e e i i o o u u u c',
    )
  })
})

describe('filterOptions', () => {
  const options = [
    { label: 'Études', value: 'etudes' },
    { label: 'À propos', value: 'a-propos' },
    { label: 'Verso', value: 'verso' },
  ]

  it('matches ignoring case and accents', () => {
    expect(filterOptions(options, 'e').map((o) => o.value)).toEqual([
      'etudes',
      'verso',
    ])
    expect(filterOptions(options, 'a').map((o) => o.value)).toEqual([
      'a-propos',
    ])
  })

  it('matches accented labels with an input without any accent', () => {
    expect(filterOptions(options, 'verso').map((o) => o.value)).toEqual([
      'verso',
    ])
  })

  it('filters out non-matching options', () => {
    const results = filterOptions(options, 'zzz')
    expect(results).toHaveLength(0)
  })
})
