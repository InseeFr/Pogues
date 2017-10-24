import { defaultSimpleForm, defaultSimpleState } from '../response-format-simple';
import { defaultSingleForm } from '../response-format-single';
import { defaultMultipleForm } from '../response-format-multiple';
import { defaultTableForm } from '../response-format-table';
import { QUESTION_TYPE_ENUM, DATATYPE_NAME, DATATYPE_TYPE_FROM_NAME } from 'constants/pogues-constants';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

export const responseFormatSimpleTextForm = {
  type: SIMPLE,
  [SIMPLE]: defaultSimpleForm,
  [SINGLE_CHOICE]: defaultSingleForm,
  [MULTIPLE_CHOICE]: defaultMultipleForm,
  [TABLE]: defaultTableForm,
};

export const responseFormatSimpleTextState = {
  type: SIMPLE,
  [SIMPLE]: defaultSimpleState,
};

export const responseFormatSimpleTextModel = {
  questionType: SIMPLE,
  Response: [
    {
      mandatory: false,
      CollectedVariableReference: 'FIRSTID',
      Datatype: { typeName: TEXT, MaxLength: 255, Pattern: '', type: DATATYPE_TYPE_FROM_NAME.TEXT },
    },
  ],
};
