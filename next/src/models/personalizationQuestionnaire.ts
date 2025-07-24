export type PersonalizationQuestionnaire = {
  id: string;
  poguesId: string;
  label: string;
  modes: Mode[];
  context: SurveyContext;
  interrogationData?: File;
  isSynchronized: boolean;
};

export type Mode = {
  name: 'CAPI' | 'CAWI' | 'PAPI' | 'CATI';
  isWebMode: boolean;
};

export type SurveyContext = {
  name: 'BUSINESS' | 'HOUSEHOLD';
  value?: 'Entreprise' | 'Ménage';
};

export type FileType = {
  name: string;
  value: string;
};

export type UploadError = {
  message: string;
  details: string[];
};

export type InterrogationModeData = {
  id: string;
  displayableId: number;
  url: string;
};

//Temp type
export type InterrogationModeDataResponse = {
  questionnaireModelId: string;
  interrogations: InterrogationModeData[];
};

export enum SurveyContextEnum {
  HOUSEHOLD = 'HOUSEHOLD',
  BUSINESS = 'BUSINESS',
}

export enum SurveyContextValueEnum {
  HOUSEHOLD = 'Ménage',
  BUSINESS = 'Entreprise',
}
