import { SurveyModeEnum } from '@/api/models/pogues';

export type PersonalizationQuestionnaire = {
  id: number;
  poguesId: string;
  label: string;
  modes: Modes[];
  context: SurveyContext;
  surveyUnitData: File | undefined;
  isSynchronized: boolean;
};

export type Modes = {
  name: SurveyModeEnum;
  isWebMode: boolean;
};

export type SurveyContext = {
  name: string;
  value?: string;
};

export type FileType = {
  name: string;
  value: string;
};

export type UploadError = {
  message: string;
  details: string[];
};
