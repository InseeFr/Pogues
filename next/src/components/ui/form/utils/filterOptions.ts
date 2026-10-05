export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function filterOptions<T extends string>(
  options: { label: string; value: T }[],
  inputValue: string,
): { label: string; value: T }[] {
  const normalizedInput = normalize(inputValue)
  return options.filter((option) =>
    normalize(option.label).includes(normalizedInput),
  )
}
