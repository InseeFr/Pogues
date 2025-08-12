export type PersonalizationQuestionnaire = {
  id: string;
  poguesId: string;
  label: string;
  modes: Mode[];
  context: SurveyContext;
  interrogationData?: File;
  state: 'STARTED' | 'COMPLETED' | 'ERROR' | 'NONE';
  isOutdated: boolean;
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

export type UploadMessage = {
  message: string;
  details?: UploadMessageDetails[];
};

export type UploadMessageDetails = {
  dataIndex?: number;
  attributeKey?: string;
  message: string;
};

export type InterrogationModeData = {
  id: string;
  displayableId: number;
  url: string;
};

export type InterrogationModeDataResponse = Record<
  'CAPI' | 'CAWI' | 'PAPI' | 'CATI',
  InterrogationModeData[]
>;

export enum SurveyContextEnum {
  HOUSEHOLD = 'HOUSEHOLD',
  BUSINESS = 'BUSINESS',
}

export enum SurveyContextValueEnum {
  HOUSEHOLD = 'Ménage',
  BUSINESS = 'Entreprise',
}
