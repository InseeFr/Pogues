// for now we handle precisely 3 items with fixed label
export type ArticulationItems = [
  { label: 'Prénom'; value: string },
  { label: 'Sexe'; value: string },
  { label: 'Age'; value: string },
];

export type Articulation = { items: ArticulationItems };

export const ARTICULATION_ITEMS_TRANSLATIONS = {
  Prénom: 'articulation.common.firstName',
  Sexe: 'articulation.common.gender',
  Age: 'articulation.common.age',
} as const;

export const defaultArticulationItems: ArticulationItems = [
  { label: 'Prénom', value: '' },
  { label: 'Sexe', value: '' },
  { label: 'Age', value: '' },
];
