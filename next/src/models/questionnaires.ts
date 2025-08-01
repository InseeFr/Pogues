import { Articulation } from './articulation';
import { CodesList } from './codesLists';

export type Questionnaire = {
  id: string;
  title: string;
  targetModes: Set<TargetModes>;
  lastUpdatedDate?: Date;
  flowLogic?: FlowLogics;
  formulasLanguage?: FormulasLanguages;
  codesLists?: CodesList[];
  Articulation?: Articulation;
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
