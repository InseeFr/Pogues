import { ArticulationItems } from '@/components/articulation/overview/ArticulationOverview';
import { Variable } from '@/models/variables';

export const mockLoopVariables = [
  {
    id: 'm0kr7m5i',
    name: 'PRENOM',
    label: 'PRENOM label',
    datatype: {
      typeName: 'TEXT',
      maxLength: 249,
    },
    scope: 'm0krfx72',
    type: 'COLLECTED',
  },
  {
    id: 'm20m3jeh',
    name: 'NOM',
    label: 'NOM label',
    datatype: {
      typeName: 'TEXT',
      maxLength: 249,
    },
    scope: 'm0krfx72',
    type: 'COLLECTED',
  },
  {
    id: 'm28udv86',
    name: 'ESTPARTI',
    label: 'ESTPARTI label',
    datatype: {
      typeName: 'BOOLEAN',
    },
    scope: 'm0krfx72',
    type: 'COLLECTED',
  },
  {
    id: 'm0krgu6f',
    name: 'QUELGEAVEZ',
    label: 'QUELGEAVEZ label',
    datatype: {
      typeName: 'NUMERIC',
      minimum: 0,
      maximum: 150,
      decimals: 1,
      unit: '',
    },
    scope: 'm0krfx72',
    type: 'COLLECTED',
  },
] as Variable[];

export const mockEmptyLoopVariables: Variable[] = [];

export const mockArticulationItems: ArticulationItems = [
  {
    label: 'Prénom',
    value: 'PRENOMS',
  },
  {
    label: 'Sexe',
    value: 'if SEXE = "H" then "Homme" else "Femme"',
  },
  {
    label: 'Age',
    value: 'cast(AGE, string) || " ans"',
  },
];
