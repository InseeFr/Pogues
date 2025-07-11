export type PersonalizationQuestionnaire = {
  id: string;
  poguesId: string;
  label: string;
  modes: Mode[];
  context: SurveyContext;
  surveyUnitData?: File;
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

export type SurveyUnitModeData = {
  id: string;
  displayableId: number;
  url: string;
};

//Temp type
export type SurveyUnitModeDataResponse = {
  questionnaireModelId: string;
  surveyUnits: SurveyUnitModeData[];
};

export enum SurveyContextEnum {
  HOUSEHOLD = 'HOUSEHOLD',
  BUSINESS = 'BUSINESS',
}

export enum SurveyContextValueEnum {
  HOUSEHOLD = 'Ménage',
  BUSINESS = 'Entreprise',
}
