// for now we handle precisely 3 items with fixed label
export type ArticulationItems = [
  { label: ArticulationVariablesLabel.FirstName; value: string },
  { label: ArticulationVariablesLabel.Gender; value: string },
  { label: ArticulationVariablesLabel.Age; value: string },
]

export type Articulation = { items: ArticulationItems }

/** Label of the articulation variable used by the API. */
export enum ArticulationVariablesLabel {
  FirstName = 'Prénom',
  Gender = 'Sexe',
  Age = 'Age',
}

export const defaultArticulationItems: ArticulationItems = [
  { label: ArticulationVariablesLabel.FirstName, value: '' },
  { label: ArticulationVariablesLabel.Gender, value: '' },
  { label: ArticulationVariablesLabel.Age, value: '' },
]
