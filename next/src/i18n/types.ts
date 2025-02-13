import type { GenericTranslations } from 'i18nifty';

import {
  authMessage,
  codesListsMessage,
  commonMessage,
  createQuestionnaireMessage,
  externalMessage,
  homeMessage,
  questionnairesMessage,
} from './componentKeys';
import type { Language, fallbackLanguage } from './i18n';

export type CommonTranslation = {
  version: string;
  appName: string;
  questionnaire: string;
  documentation: string;
  legacyLink: string;
  docs: string;
  loading: string;
  edit: string;
  previous: string;
  next: string;
  close: string;
  cancel: string;
  complete: string;
  validate: string;
  add: string;
  delete: string;
  help: string;
  backToHome: string;
  retry: string;
  send: string;
  title: string;
  start: string;
};

export type AuthTranslation = {
  login: string;
  logout: string;
  message: string;
};

export type HomeTranslation = {
  altImage: string;
  label: string;
  transformVariables: string;
  poguesIntro: string;
  interfaceDescription: string;
  docsLabel: string;
  docsLink: string;
};

export type ExternalTranslation = {
  publicEnemy: string;
  publicEnemyLabel: string;
};

export type QuestionnairesTranslation = {
  title: string;
  create: string;
  lastUpdate: string;
  search: string;
  stamp: string;
};

export type CodesListsTranslation = {
  title: string;
  create: string;
  new: string;
  code: string;
  lastUpdate: string;
  usedIn: string;
  addList: string;
  addCode: string;
  importCsv: string;
  value: string;
  label: string;
};

export type CreateQuestionnaireTranslation = {
  mode: string;
  create: string;
  dynamicField: string;
  formulaField: string;
  createSuccess: string;
  filter: string;
  redirect: string;
  titleMessage: string;
  targetMessage: string;
};

export type CommonMessage = keyof CommonTranslation;
export type AuthMessage = keyof AuthTranslation;
export type HomeMessage = keyof HomeTranslation;
export type ExternalMessage = keyof ExternalTranslation;
export type QuestionnairesMessage = keyof QuestionnairesTranslation;
export type CodesListsMessage = keyof CodesListsTranslation;
export type CreateQuestionnaireMessage = keyof CreateQuestionnaireTranslation;

export type ComponentKey =
  | typeof commonMessage
  | typeof authMessage
  | typeof homeMessage
  | typeof externalMessage
  | typeof questionnairesMessage
  | typeof codesListsMessage
  | typeof createQuestionnaireMessage;

export type Translations<L extends Language> = GenericTranslations<
  ComponentKey,
  Language,
  typeof fallbackLanguage,
  L
>;
