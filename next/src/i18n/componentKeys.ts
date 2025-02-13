import { declareComponentKeys } from 'i18nifty';

import type {
  AuthMessage,
  CodesListsMessage,
  CommonMessage,
  CreateQuestionnaireMessage,
  ExternalMessage,
  HomeMessage,
  QuestionnairesMessage,
} from './types';

export const { i18n: commonMessage } =
  declareComponentKeys<CommonMessage>()('commonMessage');

export const { i18n: authMessage } =
  declareComponentKeys<AuthMessage>()('authMessage');

export const { i18n: homeMessage } =
  declareComponentKeys<HomeMessage>()('homeMessage');

export const { i18n: externalMessage } =
  declareComponentKeys<ExternalMessage>()('externalMessage');

export const { i18n: questionnairesMessage } =
  declareComponentKeys<QuestionnairesMessage>()('questionnairesMessage');

export const { i18n: codesListsMessage } =
  declareComponentKeys<CodesListsMessage>()('codesListsMessage');

export const { i18n: createQuestionnaireMessage } =
  declareComponentKeys<CreateQuestionnaireMessage>()(
    'createQuestionnaireMessage',
  );
