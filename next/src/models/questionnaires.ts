import type { Articulation } from './articulation';
import type { CodesList } from './codesLists';
import type { Scopes } from './scopes';

export type Questionnaire = {
  id: string;
  title: string;
  targetModes: Set<TargetModes>;
  lastUpdatedDate?: Date;
  flowLogic?: FlowLogics;
  formulasLanguage?: FormulasLanguages;
  codesLists?: CodesList[];
  Articulation?: Articulation;
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Scopes;
};

export enum TargetModes {
  CAWI,
  CAPI,
  PAPI,
  CATI,
}

export enum FlowLogics {
  Filter = 'FILTER',
  Redirection = 'REDIRECTION',
}

export enum FormulasLanguages {
  XPath = 'XPATH',
  VTL = 'VTL',
}
