import { CodesList } from './codesLists';

export type Questionnaire = {
  id: string;
  title: string;
  targetModes: Set<TargetModes>;
  lastUpdatedDate?: Date;
  flowLogic?: FlowLogics;
  formulasLanguage?: FormulasLanguages;
  codesLists?: CodesList[];
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
